export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await proxyAuthRequest(event, 'login', 'POST', body)
  const token = response?.token

  if (typeof token === 'string' && token.length > 0) {
    const maxAge = getTokenMaxAge(token)

    setCookie(event, 'token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: getRequestProtocol(event) === 'https',
      path: '/',
      maxAge,
    })
  }

  return response
})

function getTokenMaxAge(token: string) {
  const fallbackMaxAge = 60 * 60 * 24 * 7

  try {
    const payload = token.split('.')[1]
    if (!payload) return fallbackMaxAge

    const claims = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    )
    const expiresAt = Number(claims.exp)
    const maxAge = expiresAt - Math.floor(Date.now() / 1000)

    return Number.isFinite(maxAge) && maxAge > 0 ? maxAge : fallbackMaxAge
  } catch {
    return fallbackMaxAge
  }
}
