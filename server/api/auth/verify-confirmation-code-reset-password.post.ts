export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'verify-confirmation-code-reset-password', 'POST')
})
