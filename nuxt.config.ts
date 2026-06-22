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
  modules: [],
  runtimeConfig: {
    platformApiBase: "url_to_platform_api",
    public: {
      siteUrl: "url_to_site",
      stripePublicKey: "stripe_public_key"
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

})