import { createError, getQuery, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const clothes = String(getQuery(event).clothes || '').trim()

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!clothes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le slug du vêtement est requis',
    })
  }

  const response = await $fetch.raw('/avatar/bodies', {
    baseURL: apiUrl,
    query: { clothes },
    headers: { accept: 'application/json' },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
