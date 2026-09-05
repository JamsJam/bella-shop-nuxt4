export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/update-name', 'POST', {
    authenticated: true,
  })
})
