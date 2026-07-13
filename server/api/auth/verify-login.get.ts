export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'verify-login', 'GET', undefined, {
    useTokenAuthorization: true,
  })
})
