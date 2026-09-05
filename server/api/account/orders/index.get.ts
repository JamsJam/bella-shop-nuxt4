export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'customers/orders', 'GET', {
    authenticated: true,
  })
})
