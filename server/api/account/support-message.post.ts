export default defineEventHandler((event) => {
  return proxyPlatformRequest(event, 'auth/send-support-message', 'POST')
})
