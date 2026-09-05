import { createError, setResponseStatus } from 'h3'

interface ShippingCountryDTO {
  destination?: string
  priceCents?: number
  flag?: string | null
}

interface ShippingCountryListDTO {
  countries?: ShippingCountryDTO[]
}

const getAbsoluteUrl = (path: string | null | undefined, apiUrl: string) => {
  if (!path) {
    return ''
  }

  try {
    return new URL(path, apiUrl).toString()
  } catch {
    return path
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiUrl = config.platformApiBase

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  const response = await $fetch.raw<ShippingCountryListDTO>(
    '/checkout/contry',
    {
      baseURL: apiUrl,
      headers: {
        accept: 'application/json',
      },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)

  return (response._data?.countries || []).map((country) => ({
    code: country.destination || '',
    name: country.destination || '',
    flag: getAbsoluteUrl(country.flag, apiUrl),
    deliveryFee: Number(country.priceCents || 0) / 100,
  }))
})
