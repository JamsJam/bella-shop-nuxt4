type VerifyLoginResponse = {
  isLoggedIn?: boolean
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const requestFetch = import.meta.server ? useRequestFetch() : $fetch
    const response = await requestFetch.raw<VerifyLoginResponse | boolean>(
      '/api/auth/verify-login',
      {
        credentials: 'include',
        ignoreResponseError: true,
      }
    )

    if (response.status < 200 || response.status >= 300) {
      return false
    }

    return response._data === true || response._data?.isLoggedIn === true
  } catch (error) {
    console.error('auth middleware: erreur de vérification de connexion', error)
    return false
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const isAuthenticated = await isUserAuthenticated()

  if (!isAuthenticated) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})
