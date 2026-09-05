import { createError, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const colorId = getRouterParam(event, 'id')

  if (!apiUrl || !colorId) {
    throw createError({ statusCode: apiUrl ? 400 : 500 })
  }

  const response = await $fetch.raw(
    `/avatar/eyebrow-colors/${colorId}/eyebrows`,
    {
      baseURL: apiUrl,
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
