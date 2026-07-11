import {
  appendHeader,
  createError,
  getHeader,
  readBody,
  setResponseStatus,
  type H3Event,
} from 'h3'

type AuthProxyMethod = 'GET' | 'POST'

export async function proxyAuthRequest(
  event: H3Event,
  path: string,
  method: AuthProxyMethod
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
  const body = method === 'GET' ? undefined : await readBody(event)
  const response = await $fetch.raw(`${apiUrl}/auth/${path}`, {
    method,
    body,
    headers: {
      ...(cookie ? { cookie } : {}),
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ignoreResponseError: true,
  })

  const headers = response.headers as Headers & {
    getSetCookie?: () => string[]
  }
  const setCookies = headers.getSetCookie?.() || []
  const fallbackSetCookie = headers.get('set-cookie')

  if (setCookies.length > 0) {
    setCookies.forEach((setCookie) => {
      appendHeader(event, 'set-cookie', setCookie)
    })
  } else if (fallbackSetCookie) {
    appendHeader(event, 'set-cookie', fallbackSetCookie)
  }

  setResponseStatus(event, response.status)
  return response._data
}
