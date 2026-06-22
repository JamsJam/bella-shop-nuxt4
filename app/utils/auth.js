export async function verifyLogin(apiUrl) {
  try {
    const response = await fetch(`${apiUrl}/auth/verify-login`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Échec de la requête pour vérifier l'authentification")
    }

    const data = await response.json()

    return true
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'authentification :",
      error
    )
    return false
  }
}
