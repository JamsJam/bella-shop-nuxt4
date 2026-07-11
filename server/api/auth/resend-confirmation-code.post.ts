export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'resend-confirmation-code', 'POST')
})
