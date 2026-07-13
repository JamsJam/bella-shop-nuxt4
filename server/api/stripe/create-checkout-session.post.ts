import {
  createError,
  getCookie,
  getHeader,
  readBody,
  setResponseStatus,
} from 'h3'

const parseCartCookie = (cartCookie: string) => {
  try {
    const cart = JSON.parse(cartCookie)

    if (!Array.isArray(cart)) {
      return []
    }

    return cart
  } catch {
    return []
  }
}

const parseShippingCookie = (shippingCookie?: string) => {
  if (!shippingCookie) {
    return null
  }

  try {
    const shipping = JSON.parse(shippingCookie)

    if (!shipping || typeof shipping !== 'object') {
      return null
    }

    return shipping as {
      selectedCountryCode?: string
      shippingInfo?: Record<string, unknown>
    }
  } catch {
    return null
  }
}

const normalizeShippingPayload = (shipping: unknown) => {
  if (!shipping || typeof shipping !== 'object') {
    return null
  }

  return shipping as {
    selectedCountryCode?: string
    shippingInfo?: Record<string, unknown>
  }
}

const deliveryCountriesMock = [
  {
    code: 'GP',
    name: 'Guadeloupe',
    flag: '/images/checkout/flags/guadeloupe_flag.png',
    deliveryFee: 4.5,
  },
  {
    code: 'MQ',
    name: 'Martinique',
    flag: '/images/checkout/flags/martinique_flag.png',
    deliveryFee: 8.9,
  },
  {
    code: 'MF',
    name: 'Saint-Martin',
    flag: '/images/checkout/flags/france_flag.png',
    deliveryFee: 12.9,
  },
  {
    code: 'FR',
    name: 'France',
    flag: '/images/checkout/flags/france_flag.png',
    deliveryFee: 14.9,
  },
]

const getCartPrice = (cart: Array<{ unitPrice?: number; price?: number; quantity?: number }>) =>
  cart.reduce((total, item) => {
    const unitPrice = Number(item.unitPrice ?? item.price ?? 0)
    const quantity = Number(item.quantity ?? 1)

    return total + unitPrice * quantity
  }, 0)

const getStripeMode = (mode: unknown) => {
  if (mode === 'prod') {
    return 'prod'
  }

  return 'test'
}

const getDeliveryCountry = (selectedCountryCode?: string) => {
  if (!selectedCountryCode) {
    return null
  }

  return (
    deliveryCountriesMock.find(
      (country) => country.code === selectedCountryCode
    ) || null
  )
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiUrl = config.platformApiBase
  const stripeMode = getStripeMode(config.stripeMode)
  const successUrl = config.stripeSuccessUrl
  const cancelUrl = config.stripeCancelUrl

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  const cartCookie = getCookie(event, 'bella_cart')
  const shippingCookie = getCookie(event, 'bella_shipping')

  if (!cartCookie) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le panier est vide.',
    })
  }

  const body = await readBody(event)
  const cookie = getHeader(event, 'cookie')
  const token = getCookie(event, 'token')
  const cart = parseCartCookie(cartCookie)
  const shipping =
    normalizeShippingPayload(body?.shipping) || parseShippingCookie(shippingCookie)
  const deliveryCountry = getDeliveryCountry(shipping?.selectedCountryCode)
  const deliveryFee = Number(deliveryCountry?.deliveryFee || 0)
  const shippingInfo = shipping?.shippingInfo || null
  const price = getCartPrice(cart) + deliveryFee

  if (cart.length === 0 || price <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le panier est vide.',
    })
  }

  if (!deliveryCountry || !shippingInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les informations de livraison sont incomplètes.',
    })
  }

  const userResponse = await $fetch.raw(`${apiUrl}/auth/verify-login`, {
    method: 'GET',
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      accept: 'application/json',
    },
    ignoreResponseError: true,
  })

  if (userResponse.status < 200 || userResponse.status >= 300) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Utilisateur non authentifié.',
    })
  }

  const response = await $fetch.raw(`${apiUrl}/stripe/create-checkout-session`, {
    method: 'POST',
    body: {
      cart,
      price,
      deliveryCountry,
      shippingInfo,
      stripeMode,
      user: userResponse._data,
      successUrl,
      cancelUrl,
    },
    headers: {
      ...(cookie ? { cookie } : {}),
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
