import {
  appendHeader,
  createError,
  getCookie,
  getHeader,
  readBody,
  setResponseStatus,
  type H3Event,
} from 'h3'

type AuthProxyMethod = 'GET' | 'POST'
type AuthProxyOptions = {
  useTokenAuthorization?: boolean
}

function splitSetCookieHeader(setCookieHeader: string) {
  return setCookieHeader
    .split(/,(?=\s*[^;,]+=)/)
    .map((setCookie) => setCookie.trim())
    .filter(Boolean)
}

function normalizeSetCookieForFront(event: H3Event, setCookie: string) {
  const forwardedProto = getHeader(event, 'x-forwarded-proto')
  const host = getHeader(event, 'host') || ''
  const isHttps =
    forwardedProto === 'https' ||
    getHeader(event, 'x-forwarded-ssl') === 'on' ||
    host.startsWith('https://')

  const attributes = setCookie
    .split(';')
    .map((attribute) => attribute.trim())
    .filter((attribute) => !/^domain=/i.test(attribute))

  const normalizedAttributes = attributes.map((attribute) =>
    /^path=/i.test(attribute) ? 'Path=/' : attribute
  )

  if (!normalizedAttributes.some((attribute) => /^path=/i.test(attribute))) {
    normalizedAttributes.push('Path=/')
  }

  if (!isHttps) {
    return normalizedAttributes
      .filter((attribute) => !/^secure$/i.test(attribute))
      .map((attribute) =>
        /^samesite=none$/i.test(attribute) ? 'SameSite=Lax' : attribute
      )
      .join('; ')
  }

  return normalizedAttributes.join('; ')
}

export async function proxyAuthRequest(
  event: H3Event,
  path: string,
  method: AuthProxyMethod,
  bodyOverride?: unknown,
  options: AuthProxyOptions = {}
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
  const token = options.useTokenAuthorization ? getCookie(event, 'token') : null
  const body = method === 'GET' ? undefined : bodyOverride ?? await readBody(event)
  // return `${apiUrl}/auth/${path}`
  const response = await $fetch.raw(`${apiUrl}/auth/${path}`, {
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

  const headers = response.headers as Headers & {
    getSetCookie?: () => string[]
  }
  const setCookies = headers.getSetCookie?.() || []
  const fallbackSetCookie = headers.get('set-cookie')

  if (setCookies.length > 0) {
    setCookies.forEach((setCookie) => {
      appendHeader(event, 'set-cookie', normalizeSetCookieForFront(event, setCookie))
    })
  } else if (fallbackSetCookie) {
    splitSetCookieHeader(fallbackSetCookie).forEach((setCookie) => {
      appendHeader(event, 'set-cookie', normalizeSetCookieForFront(event, setCookie))
    })
  }

  setResponseStatus(event, response.status)
  return response._data
}
