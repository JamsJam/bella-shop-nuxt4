export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/update-surname', 'POST', {
    authenticated: true,
  })
})
