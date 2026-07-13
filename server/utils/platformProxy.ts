import {
  appendHeader,
  createError,
  getCookie,
  getHeader,
  readBody,
  setResponseStatus,
  type H3Event,
} from 'h3'

type PlatformProxyMethod = 'GET' | 'POST' | 'DELETE'

type PlatformProxyOptions = {
  authenticated?: boolean
  bodyOverride?: unknown
}

export async function proxyPlatformRequest(
  event: H3Event,
  path: string,
  method: PlatformProxyMethod,
  options: PlatformProxyOptions = {}
) {
  const config = useRuntimeConfig()
  const apiUrl = config.platformApiBase

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  const cookie = getHeader(event, 'cookie')
  const token = options.authenticated ? getCookie(event, 'token') : null
  const body =
    method === 'GET' || method === 'DELETE'
      ? undefined
      : options.bodyOverride ?? await readBody(event)

  const response = await $fetch.raw(`${apiUrl}/${path}`, {
    method,
    body,
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ignoreResponseError: true,
  })

  const setCookie = response.headers.get('set-cookie')

  if (setCookie) {
    appendHeader(event, 'set-cookie', setCookie)
  }

  setResponseStatus(event, response.status)
  return response._data
}
