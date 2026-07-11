export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'login', 'POST')
})
