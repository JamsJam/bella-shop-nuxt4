export default defineEventHandler((event) => {
  const query = getQuery(event)
  const index = typeof query.index === 'string' ? query.index : '0'

  return proxyPlatformRequest(
    event,
    `returns/get-returns-by-user-id-and-page?index=${encodeURIComponent(index)}`,
    'GET',
    {
      authenticated: true,
    }
  )
})
