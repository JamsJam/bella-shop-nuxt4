// utils/stripe.js
import { loadStripe } from '@stripe/stripe-js'

export async function stripeCheckout(amount) {
  try {
    // Chargez votre clé publique Stripe
    const stripe = await loadStripe(
      'pk_test_51NP1Y4IhxIDES8QzTEiDXKAqANy8t1LGuWyRRaGCvLiCSghABvKepckd1ch5P3umi8RZj9tL0cSNhEXl7O9kkfXp00txC3hvqE'
    )

    // Créez une session de paiement avec le montant total
    const response = await fetch(
      'http://localhost:8080/stripe/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 50 }),
      }
    )

    const session = await response.json()

    // Redirigez l'utilisateur vers le formulaire de paiement de Stripe
    if (session && session.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        // Gérer les erreurs de redirection
        console.error(result.error.message)
        // Affichez un message d'erreur à l'utilisateur
      }
    }
  } catch (error) {
    console.error('Error during checkout:', error)
    // Affichez un message d'erreur à l'utilisateur
  }
}
