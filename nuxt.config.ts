// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: [new URL('./assets/styles/app.scss', import.meta.url).pathname],
  
  ssr: true,
  // cors: false,
  routeRules: {
    '/': { prerender: false },
  },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    platformApiBase: "platform_api_base",
    cryptoSecretKey: "crypto_secret_key",
    stripeMode: "test",
    stripeSuccessUrl: "url_to_stripe_success_page",
    stripeCancelUrl: "url_to_stripe_cancel_page",
    public: {
      platformApiBase: "platform_api_base",
      siteUrl: "url_to_site",
      stripePublicKey: "stripe_public_key"
    }
  },
  app: {
    head: {
      script: [
        { src: "https://analytics.ahrefs.com/analytics.js", 'data-key': "6pa4LnzMnrcaiDPQiwDR/g", async: true }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

})
