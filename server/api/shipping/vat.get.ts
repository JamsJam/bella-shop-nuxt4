import { createError, setResponseStatus } from 'h3'

interface CheckoutVatDTO {
  vat?: number
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

  const response = await $fetch.raw<CheckoutVatDTO>('/checkout/vat', {
    baseURL: apiUrl,
    headers: {
      accept: 'application/json',
    },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
