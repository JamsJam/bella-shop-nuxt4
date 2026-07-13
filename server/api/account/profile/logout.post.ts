export default defineEventHandler(async (event) => {
  const response = await proxyPlatformRequest(event, 'auth/logout', 'POST', {
    authenticated: true,
  })

  deleteCookie(event, 'token', {
    path: '/',
  })

  return response
})
