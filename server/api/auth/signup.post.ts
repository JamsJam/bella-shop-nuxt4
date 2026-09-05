export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'signup', 'POST')
})
