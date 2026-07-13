export default defineEventHandler(async (event) => {
  const response = await proxyPlatformRequest(event, 'auth/delete-user', 'DELETE', {
    authenticated: true,
  })

  deleteCookie(event, 'token', {
    path: '/',
  })

  return response
})
