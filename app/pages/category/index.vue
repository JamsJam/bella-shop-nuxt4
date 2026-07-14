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


                <div
                    class="clothes_selection_container_hero"
                    :style="categoryPage?.bandeau?.background
                        ? { background: `url('${categoryPage.bandeau.background}') 50%/cover no-repeat` }
                        : { background: 'url(../images/clothes/category_banniere.jpg) 50%/cover no-repeat' }"
                >
                    <div class="clothes_selection_container_hero_container" >
                        <h2 v-html="categoryPage?.bandeau?.title || 'Quel vêtement <strong> te convient</strong> le mieux ?'"></h2>
                        <NuxtLink to="/avatar" class="button--primary" > {{ categoryPage?.bandeau?.cta || 'Crée ton avatar' }} </NuxtLink>
                    </div>
                </div>
            </div>

            <!--<LoaderComponent :loading="loaderStatus" />-->
        </div>


        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type CategoryPageDTO from '#shared/dto/categorypage.dto'
import type { CategoryListDTO } from '#shared/dto/categorylist.dto'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import Footer from '~/components/attachable/Footer.vue'

const { data: categoryPage } = await useFetch<CategoryPageDTO>('/api/category')
const categories = computed<CategoryListDTO[]>(() => categoryPage.value?.categories ?? [])
useHead(() => {
  if (categoryPage.value?.seo) {
    return {
      title: categoryPage.value.seo.title,
      meta: [
        { name: 'description', content: categoryPage.value.seo.description },
        { name: 'keywords', content: categoryPage.value.seo.keywords },
        { property: 'og:title', content: categoryPage.value.seo.ogTitle },
        { property: 'og:description', content: categoryPage.value.seo.ogDescription },
        { property: 'og:url', content: categoryPage.value.seo.ogUrl },
        { property: 'og:image', content: categoryPage.value.seo.ogImage },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: categoryPage.value.seo.jsonLd,
        },
      ],
    }
  }

})


</script>

<style lang="scss">



.clothes_page {
    position: relative;
    overflow: hidden;
}
</style>

