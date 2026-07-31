<template>
  <div class="server_error_page">
    <main class="server_error_page_main">
      <section class="server_error_page_card" aria-labelledby="server-error-title">
        <NuxtLink to="/" class="server_error_page_brand" @click="returnHome">
          BellaGP
        </NuxtLink>

        <div class="server_error_page_icon" aria-hidden="true">!</div>

        <p class="server_error_page_code">Erreur {{ error.statusCode }}</p>
        <h1 id="server-error-title">Quelque chose s’est mal passé</h1>
        <p class="server_error_page_message">
          Nous ne pouvons pas afficher cette page pour le moment. Vous allez
          être redirigé vers la page d’accueil.
        </p>

        <p
          v-if="isHandledServerError"
          class="server_error_page_redirect"
          aria-live="polite"
        >
          Redirection dans
          <strong>{{ remainingSeconds }}</strong>
          {{ remainingSeconds > 1 ? 'secondes' : 'seconde' }}.
        </p>

        <button type="button" class="button--primary" @click="returnHome">
          Retourner à l’accueil
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const redirectDelay = 8
const remainingSeconds = ref(redirectDelay)
const redirectTimer = ref<ReturnType<typeof setInterval> | null>(null)
const isHandledServerError = computed(() =>
  props.error.statusCode === 404 || props.error.statusCode === 500
)

const stopRedirectTimer = () => {
  if (!redirectTimer.value) return

  clearInterval(redirectTimer.value)
  redirectTimer.value = null
}

const returnHome = async () => {
  stopRedirectTimer()
  await clearError({ redirect: '/' })
}

onMounted(() => {
  if (!isHandledServerError.value) return

  redirectTimer.value = setInterval(async () => {
    remainingSeconds.value -= 1

    if (remainingSeconds.value <= 0) {
      await returnHome()
    }
  }, 1000)
})

onBeforeUnmount(stopRedirectTimer)

useHead({
  title: 'Une erreur est survenue | BellaGP',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
