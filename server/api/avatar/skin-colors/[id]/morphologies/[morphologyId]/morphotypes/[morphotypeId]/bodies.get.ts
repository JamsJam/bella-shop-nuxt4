import { createError, getQuery, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const skinColorId = getRouterParam(event, 'id')
  const morphologyId = getRouterParam(event, 'morphologyId')
  const morphotypeId = getRouterParam(event, 'morphotypeId')
  const clothes = String(getQuery(event).clothes || '')

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!skinColorId || !morphologyId || !morphotypeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La couleur de peau, la morphologie et le morphotype sont requis.',
    })
  }

  const response = await $fetch.raw(
    `/avatar/skin-colors/${skinColorId}/morphologies/${morphologyId}/morphotypes/${morphotypeId}/bodies`,
    {
      baseURL: apiUrl,
      query: clothes ? { clothes } : undefined,
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
