<template>
  <div class="confirm_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <main class="confirm_page_main">
      <section class="confirm_page_card" aria-labelledby="confirmation-title">
        <div class="confirm_page_icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12.5 4.25 4.25L19 7"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="confirm_page_content">
          <h1 id="confirmation-title">Merci pour votre commande !</h1>
          <p>
            Votre paiement a bien été pris en compte et votre commande est
            confirmée.
          </p>
          <p>
            Un e-mail de confirmation contenant le récapitulatif de votre
            commande et votre facture vous sera envoyé prochainement.
          </p>
        </div>

        <p class="confirm_page_redirect" aria-live="polite">
          Vous serez redirigé vers la page d'accueil dans
          <strong>{{ remainingSeconds }}</strong>
          {{ remainingSeconds > 1 ? 'secondes' : 'seconde' }}.
        </p>

        <NuxtLink to="/" class="button--primary confirm_page_button">
          Retourner à l'accueil
        </NuxtLink>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import Footer from '~/components/attachable/Footer.vue'

const remainingSeconds = ref(10)
let countdownTimer: ReturnType<typeof setInterval> | null = null

useHead({
  title: 'Commande confirmée | Bella',
})

onMounted(() => {
  countdownTimer = setInterval(async () => {
    remainingSeconds.value -= 1

    if (remainingSeconds.value <= 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }

      await navigateTo('/')
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>
