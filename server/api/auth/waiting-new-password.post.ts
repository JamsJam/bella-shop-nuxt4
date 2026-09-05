export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'waiting-new-password', 'POST')
})
