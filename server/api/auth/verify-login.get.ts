import { getResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  await proxyPlatformRequest(event, 'customers/me', 'GET', {
    authenticated: true,
  })

  return {
    isLoggedIn: getResponseStatus(event) >= 200 &&
      getResponseStatus(event) < 300,
  }
})
