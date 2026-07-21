import { createError, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiUrl = config.platformApiBase
  const skinColorId = getRouterParam(event, 'id')
  const morphotypeId = getRouterParam(event, 'morphotypeId')

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!skinColorId || !morphotypeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La couleur de peau et le morphotype sont requis.',
    })
  }

  const response = await $fetch.raw(
    `/avatar/skin-colors/${skinColorId}/morphotypes/${morphotypeId}/bodies`,
    {
      baseURL: apiUrl,
      headers: {
        accept: 'application/json',
      },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
