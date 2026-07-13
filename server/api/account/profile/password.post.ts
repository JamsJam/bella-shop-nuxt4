export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/update-hashpassword', 'POST', {
    authenticated: true,
  })
})
