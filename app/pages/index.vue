<template>
  <div class="main">
    <NavigationBar />

    <WelcomePage :section="homepage?.sections?.landing" />
    <BestSellers :section="homepage?.sections?.bestseller" />
    <About :section="homepage?.sections?.about" :highlights="homepage?.sections?.highlights" />
    <Manual :section="homepage?.sections?.manual" />
    <Delivery :section="homepage?.sections?.return?.steps" />


    <Foooter />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com"  />
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
      rel="stylesheet"
    />
  </div>
</template>

<script setup lang="ts">
import type HomepageDTO from '#shared/dto/homepage.dto'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import WelcomePage from '~/components/homepage/WelcomePage.vue'
import BestSellers from '~/components/homepage/BestSellers.vue'
import About from '~/components/homepage/About.vue'
import Manual from '~/components/homepage/Manual.vue'
import Delivery from '~/components/homepage/Delivery.vue'
import Foooter from '~/components/attachable/Footer.vue'

const { data: homepage } = await useFetch<HomepageDTO>('/api/page/home')

useHead(() => {
  if (!homepage.value?.seo) {
    return {
      
    }
  }

  return {
    title: homepage.value.seo.title,
    meta: [
      { name: 'description', content: homepage.value.seo.description },
      { name: 'keywords', content: homepage.value.seo.keywords },
      { property: 'og:title', content: homepage.value.seo.ogTitle },
      { property: 'og:description', content: homepage.value.seo.ogDescription },
      { property: 'og:url', content: homepage.value.seo.ogUrl },
      { property: 'og:image', content: homepage.value.seo.ogImage },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: homepage.value.seo.jsonLd,
      },
    ],
  }
})
</script>

<style lang="scss">


.main {
  overflow: hidden;
}
</style>
