export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/update-email', 'POST', {
    authenticated: true,
  })
})
