export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const apiUrl = config.platformApiBase

  if (!apiUrl) {
    console.error('auth middleware: platformApiBase is not défini')
    return false
  }

  try {
    const response = await fetch(`${apiUrl}/auth/verify-login`, {
      method: 'GET',
      credentials: 'include',
    })

    return response.ok
  } catch (error) {
    console.error('auth middleware: erreur de vérification de connexion', error)
    return false
  }
})
