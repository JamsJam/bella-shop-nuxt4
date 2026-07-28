<template>
  <section class="best_sellers">
    <div class="navigation_bar_area"></div>

    <h2>
      Best Sellers
      <span id="debug"></span>
    </h2>

    <div class="best_sellers_content" ref="bestSellersContent">
      <!--
        ?=============================================================================
        ?================================  Container  ================================
        ?=============================================================================
      -->

      <button
        v-if="navIndexMax > 1 && navIndex < navIndexMax"
        type="button"
        class="best_sellers_content_button best_sellers_content_button--previous"
        aria-label="Voir les produits suivants"
        @click="navigateToCarouselPosition(navIndex + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.5 8.5l-4 4l-4-4"
          />
        </svg>
      </button>
      <div class="best_sellers_content_container" ref="bestSellersContainer">
        <!--<button v-if="bestSellersTemplate[clothingDisplayIndex - 1]" class="best_sellers_content_container_button_card best_sellers_content_container_previous_card" @click="setPreviousBestSeller()">-->

        <!--
            ?=============================================================================
            !================================  Carte  ================================
            ?=============================================================================
          -->

        <article v-for="item in bestSellersTemplate" :key="item.id" class="card">
          <NuxtLink
            :to="`/clothes/${item.slug}`"
            class="card_product_link"
            :aria-label="`Voir ${item.name}`"
          >
            <div class="card_image">
              <img
                v-if="item.preview_image"
                :src="item.preview_image"
                :alt="item.name"
                loading="lazy"
              />
              <div v-else class="card_image_placeholder" aria-hidden="true">
                Image indisponible
              </div>
            </div>

            <div class="card_text">
              <h3 class="card_text_title">{{ item.name }}</h3>
              <p class="card_text_price">{{ item.calcultedPriceTTC }} €</p>
            </div>
          </NuxtLink>

          <NuxtLink
            :to="`/clothes/${item.slug}`"
            class="button--secondary card_add_to_cart"
            :aria-label="`Voir le produit ${item.name}`"
          >
            Voir le produit
          </NuxtLink>
        </article>
      </div>

      <button
        v-if="navIndexMax > 1 && navIndex > 1"
        type="button"
        class="best_sellers_content_button best_sellers_content_button--next"
        aria-label="Voir les produits précédents"
        @click="navigateToCarouselPosition(navIndex - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.5 8.5l-4 4l-4-4"
          />
        </svg>
      </button>
    </div>

    <div v-if="navIndexMax > 1" class="best_sellers_navigation">
      <button
        v-for="n in navIndexMax"
        :id="`navi-dot-${n}`"
        :key="n"
        type="button"
        class="best_sellers_navigation_dot"
        :class="n == navIndex ? 'activ' : ''"
        :aria-label="`Afficher la page ${n} des Best Sellers`"
        :aria-current="n === navIndex ? 'true' : undefined"
        @click="navigateToCarouselPosition(n)"
      ></button>
    </div>
  </section>
</template>

<script lang="ts">

import type { PropType } from 'vue'
import type { HomepageBestsellerDTO, BestSellerProductDTO } from '#shared/dto/homepage.dto'

export default {
  props: {
    section: {
      type: Object as PropType<HomepageBestsellerDTO | null>,
      default: null,
    },
  },
  data() {
    return {
      navIndexMax: 0,
      navIndex: 1,
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    bestSellersTemplate() {
      return (this.section?.products || []).map((product : BestSellerProductDTO) => {
        const images = this.parseImages(product.images)
        const preview_image = images.length ? images[0] : ''
        const priceNumber = Number(product.price || 0) / 100

        return {
          ...product,
          preview_image,
          calcultedPriceTTC: priceNumber.toFixed(2),
        }
      })
    },
  },
  // mounted() {
  //   window.addEventListener('resize', this.handleResize)
  //   this.handleResize()
  // },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.handleResize)
  // },
  watch: {
    section: {
      handler() {
        this.$nextTick(this.handleMobileSize)
      },
      immediate: true,
    },
  },
  methods: {
    parseImages(images: string): string[] {
      if (!images) {
        return []
      }

      try {
        const parsed = JSON.parse(images)
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item))
        }
      } catch {
        // not JSON, fallback to raw string
      }

      return [images]
    },
    handleResize() {
      this.handleMobileSize()
    },
    handleMobileSize() {
      const content = this.$refs.bestSellersContent as HTMLElement | undefined
      const container = this.$refs.bestSellersContainer as HTMLElement | undefined

      if (!content || !container) {
        return
      }

      const visibleWidth = content.clientWidth
      const totalWidth = container.scrollWidth

      if (totalWidth > visibleWidth) {
        this.navIndexMax = Math.ceil(totalWidth / visibleWidth)
        this.navigateToCarouselPosition(1)
      } else {
        container.style.transform = ''
        this.navIndexMax = 0
      }
    },
    navigateToCarouselPosition(position: number) {
      this.navIndex = position

      const content = this.$refs.bestSellersContent as HTMLElement | undefined
      const container = this.$refs.bestSellersContainer as HTMLElement | undefined
      if (!content || !container || this.navIndexMax === 0) {
        return
      }

      const visibleWidth = content.clientWidth
      const translateX = visibleWidth * (this.navIndex - 1)

      container.style.transform =
        `translateX(-${translateX}px)`
    },
  },
}
</script>
