export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/get-user-infos-by-id', 'GET', {
    authenticated: true,
  })
})
