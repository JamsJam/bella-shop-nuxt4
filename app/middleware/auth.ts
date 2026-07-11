export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const response = await $fetch.raw('/api/auth/verify-login', {
      headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined,
      ignoreResponseError: true,
    })

    return response.status >= 200 && response.status < 300
  } catch (error) {
    console.error('auth middleware: erreur de vérification de connexion', error)
    return false
  }
}

export default defineNuxtRouteMiddleware(async () => {
  const isAuthenticated = await isUserAuthenticated()

  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
