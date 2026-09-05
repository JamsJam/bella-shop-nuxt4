import { createError, getRouterParam, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const apiUrl = useRuntimeConfig(event).platformApiBase
  const faceId = Number(getRouterParam(event, 'faceId'))

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (!Number.isInteger(faceId) || faceId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La tête est requise',
    })
  }

  const response = await $fetch.raw(`/avatar/faces/${faceId}/accessories`, {
    baseURL: apiUrl,
    headers: { accept: 'application/json' },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
