import { createError, getQuery, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const skinColorId = Number(getQuery(event).skinColorId)

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!Number.isInteger(skinColorId) || skinColorId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La couleur de peau est requise',
    })
  }

  const response = await $fetch.raw(
    `/avatar/skin-colors/${skinColorId}/faces/accessories`,
    {
      baseURL: apiUrl,
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  setResponseStatus(event, response.status)
  return response._data
})
