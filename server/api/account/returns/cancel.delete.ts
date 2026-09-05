export default defineEventHandler((event) => {
  const query = getQuery(event)
  const returnId = typeof query.returnId === 'string' ? query.returnId : ''

  return proxyPlatformRequest(
    event,
    `returns/cancel-return-request?returnId=${encodeURIComponent(returnId)}`,
    'DELETE',
    {
      authenticated: true,
    }
  )
})
