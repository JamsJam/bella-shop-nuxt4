<template>
    <div class="clothes_page">
        <NavigationBar />


        <div class="clothes_selection">
            <div class="clothes_selection_container">
                <div class="clothes_selection_container_header">
                    <h1 class="clothes_selection_container_header_title">
                        Nos différentes tenues

                        <span>
                            <NuxtLink to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
                                    <path d="M12.4998 15.0416L6.6665 9.49992L12.4998 3.95825" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Retour
                            </NuxtLink>
                        </span>
                    </h1>
                    <p class="clothes_selection_container_header_subTitle">
                        Nous proposons des vêtements pour diverses occasions.
                    </p>
                </div>
                <div class="clothes_selection_container_grid">

                    <!--! grid component-->
                    <nuxt-link v-for="(category, index) in categories" :key="index" :to="{
                        path: `/category/${category.slug.toLowerCase()}`
                    }" class="clothes_selection_container_grid_item">
                        <div class="clothes_selection_container_grid_item_image">
                            <img :src="`${category.image}`" alt="" />
                        </div>
                        <div class="clothes_selection_container_grid_item_title">
                            <h2>{{ category.name }}</h2>

                        </div>
                    </nuxt-link>
                    <!--! grid component-->

                </div>
                <div class="clothes_selection_container_hero">
                    <div class="clothes_selection_container_hero_container">
                        <h2>Quel <strong>vêtement</strong> te convient le mieux ?</h2>
                        <NuxtLink to="/avatar" class="button--primary"> Crée ton avatar </NuxtLink>
                    </div>
                </div>
            </div>

            <!--<LoaderComponent :loading="loaderStatus" />-->
        </div>


        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type CategoryPageDTO from '#shared/dto/categorypage.dto'
import type { CategoryListDTO } from '#shared/dto/categorylist.dto'
import type { BandeauDTO } from '#shared/dto/bandeau.dto'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import Footer from '~/components/attachable/Footer.vue'

const page = ref<CategoryPageDTO | null>(null)
const categories = computed<CategoryListDTO[]>(() => page.value?.categories ?? [])
const bandeau = computed<BandeauDTO | null>(() => page.value?.bandeau ?? null)

useHead(() => {
  if (!page.value?.seo) {
    return {}
  }

  return {
    title: page.value.seo.title,
    meta: [
      { name: 'description', content: page.value.seo.description },
      { name: 'keywords', content: page.value.seo.keywords },
      { property: 'og:title', content: page.value.seo.ogTitle },
      { property: 'og:description', content: page.value.seo.ogDescription },
      { property: 'og:url', content: page.value.seo.ogUrl },
      { property: 'og:image', content: page.value.seo.ogImage },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: page.value.seo.jsonLd,
      },
    ],
  }
})

async function loadCategoryPage() {
  try {
    const response = await fetch('/api/category')
    if (!response.ok) throw new Error('Failed to fetch category page')
    const data = await response.json()
    page.value = data
  } catch (error) {
    console.error('Erreur lors du chargement de la page catégories:', error)
  }
}

onMounted(async () => {
  await loadCategoryPage()
})
</script>

<style lang="scss">



.clothes_page {
    position: relative;
    overflow: hidden;
}
</style>


