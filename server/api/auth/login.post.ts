export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('[auth/login] Requête reçue', {
    email: body?.email,
  },
event,
body)

  const response = await proxyAuthRequest(event, 'login', 'POST', body)
  const token = response?.token

  console.log('[auth/login] Réponse du backend', response)

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
