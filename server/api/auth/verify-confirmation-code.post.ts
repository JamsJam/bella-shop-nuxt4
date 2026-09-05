export default defineEventHandler((event) => {
  return readBody(event).then((body) =>
    proxyAuthRequest(event, 'verify-confirmation-code', 'POST', {
      code: body?.code,
      id: body?.id ?? body?.userId,
    })
  )
})
