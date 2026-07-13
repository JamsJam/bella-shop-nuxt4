export default defineEventHandler((event) => {
  return proxyAuthRequest(event, 'login', 'POST').then((response) => {
    const token = response?.token

    if (typeof token === 'string' && token.length > 0) {
      setCookie(event, 'token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: getRequestProtocol(event) === 'https',
        path: '/',
      })
    }

    return response
  })
})
