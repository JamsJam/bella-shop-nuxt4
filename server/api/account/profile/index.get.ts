import { createError, getCookie } from 'h3'

export default defineEventHandler((event) => {
  if (!getCookie(event, 'token')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentification requise',
    })
  }

  return proxyPlatformRequest(event, 'customers/me', 'GET', {
    authenticated: true,
  })
})
