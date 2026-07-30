import {
  createError,
  getCookie,
  getHeader,
  readBody,
  setResponseStatus,
} from 'h3'

interface CartSizeDTO {
  id?: number
}

interface CartItemDTO {
  size?: CartSizeDTO | null
  quantity?: number
}

interface CheckoutItemDTO {
  variantId: number
  quantity: number
}

interface ShippingInfoDTO {
  name?: string
  surname?: string
  shippingTitle?: string
  shippingAddress?: string
  shippingAddress2?: string
  lieuDit?: string
  postalCode?: string
  city?: string
  selectedTel?: string
  tel?: string
  country?: string
  deliveryDate?: string
  selectedDelivery?: number | string
}

interface CreateCheckoutSessionBody {
  shippingDestination?: string
  shippingInfo?: ShippingInfoDTO
}

const normalizeText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

const normalizeShippingInfo = (
  shippingInfo?: ShippingInfoDTO
): ShippingInfoDTO | null => {
  if (!shippingInfo) return null

  const normalizedShippingInfo: ShippingInfoDTO = {
    name: normalizeText(shippingInfo.name),
    surname: normalizeText(shippingInfo.surname),
    shippingTitle: normalizeText(shippingInfo.shippingTitle),
    shippingAddress: normalizeText(shippingInfo.shippingAddress),
    shippingAddress2: normalizeText(shippingInfo.shippingAddress2),
    lieuDit: normalizeText(shippingInfo.lieuDit),
    postalCode: normalizeText(shippingInfo.postalCode),
    city: normalizeText(shippingInfo.city),
    selectedTel: normalizeText(shippingInfo.selectedTel),
    tel: normalizeText(shippingInfo.tel),
    country: normalizeText(shippingInfo.country),
    deliveryDate: normalizeText(shippingInfo.deliveryDate),
    selectedDelivery: Number(shippingInfo.selectedDelivery) || 0,
  }

  if (
    !normalizedShippingInfo.shippingAddress
    || !normalizedShippingInfo.postalCode
    || !normalizedShippingInfo.city
    || !normalizedShippingInfo.country
  ) {
    return null
  }

  return normalizedShippingInfo
}

const parseCartCookie = (cartCookie: string): CartItemDTO[] => {
  try {
    const cart = JSON.parse(cartCookie)
    return Array.isArray(cart) ? cart : []
  } catch {
    return []
  }
}

const mapCheckoutItems = (cart: CartItemDTO[]): CheckoutItemDTO[] =>
  cart.map((item) => {
    const variantId = Number(item.size?.id)
    const quantity = Number(item.quantity ?? 1)

    if (!Number.isInteger(variantId) || variantId <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Une variante du panier est invalide.',
      })
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Une quantité du panier est invalide.',
      })
    }

    return { variantId, quantity }
  })

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiUrl = config.platformApiBase
  const body = await readBody<CreateCheckoutSessionBody>(event)
  const shippingDestination = body?.shippingDestination?.trim()
  const shippingInfo = normalizeShippingInfo(body?.shippingInfo)

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!shippingDestination) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La destination de livraison est requise.',
    })
  }

  if (!shippingInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'L’adresse de livraison est incomplète.',
    })
  }

  const cartCookie = getCookie(event, 'bella_cart')

  if (!cartCookie) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le panier est vide.',
    })
  }

  const items = mapCheckoutItems(parseCartCookie(cartCookie))

  if (items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le panier est vide.',
    })
  }

  const cookie = getHeader(event, 'cookie')
  const token = getCookie(event, 'token')
  const response = await $fetch.raw('/checkout/carts', {
    baseURL: apiUrl,
    method: 'POST',
    body: {
      items,
      currency: 'EUR',
      shippingDestination,
      shippingInfo,
    },
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
