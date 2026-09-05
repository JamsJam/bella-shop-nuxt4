import { createError, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  const response = await $fetch.raw('/avatar/eyes-colors', {
    baseURL: apiUrl,
    headers: { accept: 'application/json' },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
