import { createError, setResponseStatus } from 'h3'

const supportedTypes = ['faces', 'noses'] as const

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiUrl = config.platformApiBase
  const id = getRouterParam(event, 'id')
  const type = getRouterParam(event, 'type')

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  if (
    !id ||
    !type ||
    !supportedTypes.includes(type as (typeof supportedTypes)[number])
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La partie demandée est invalide.',
    })
  }

  const response = await $fetch.raw(`/avatar/skin-colors/${id}/${type}`, {
    baseURL: apiUrl,
    headers: {
      accept: 'application/json',
    },
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status)
  return response._data
})
