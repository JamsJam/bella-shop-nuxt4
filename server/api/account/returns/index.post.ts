export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'returns/add-return-request', 'POST', {
    authenticated: true,
  })
})
