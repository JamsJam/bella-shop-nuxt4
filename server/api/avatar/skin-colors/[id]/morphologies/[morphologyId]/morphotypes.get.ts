import { createError, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const skinColorId = getRouterParam(event, 'id')
  const morphologyId = getRouterParam(event, 'morphologyId')

  if (!apiUrl || !skinColorId || !morphologyId) {
    throw createError({ statusCode: apiUrl ? 400 : 500 })
  }

  const response = await $fetch.raw(
    `/avatar/skin-colors/${skinColorId}/morphologies/${morphologyId}/morphotypes`,
    {
      baseURL: apiUrl,
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
