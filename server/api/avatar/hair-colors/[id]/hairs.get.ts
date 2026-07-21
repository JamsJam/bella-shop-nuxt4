import { createError, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const hairColorId = getRouterParam(event, 'id')

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!hairColorId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La couleur de cheveux est requise.',
    })
  }

  const response = await $fetch.raw(
    `/avatar/hair-colors/${hairColorId}/hairs`,
    {
      baseURL: apiUrl,
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
