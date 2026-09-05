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
    '/account': { robots: false },
    '/avis/**': { robots: false },
    '/cart': { robots: false },
    '/confirm': { robots: false },
    '/expedition': { robots: false },
    '/forgot-password': { robots: false },
    '/login': { robots: false },
    '/signup': { robots: false },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  site: {
    url: 'url_to_site',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: [
          '/__robots__/',
          '/__sitemap__/',
          '/account',
          '/avis/',
          '/cart',
          '/confirm',
          '/expedition',
          '/forgot-password',
          '/login',
          '/signup',
        ],
      },
    ],
  },
  runtimeConfig: {
    platformApiBase: "platform_api_base",
    cryptoSecretKey: "crypto_secret_key",
    // stripeMode: "test",
    // stripeSuccessUrl: "url_to_stripe_success_page",
    // stripeCancelUrl: "url_to_stripe_cancel_page",
    public: {
      platformApiBase: "platform_api_base",

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
