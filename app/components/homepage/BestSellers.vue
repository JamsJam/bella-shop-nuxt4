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
        @click="navigateToCarouselPosition(navIndex + 1)"
        class="best_sellers_content_button best_sellers_content_button--previous"
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

        <article
          v-for="item in bestSellersTemplate"
          :key="item.id"
          class="card"
        >
          <!--
                ?--------  Image  --------
              -->
          <div class="card_image">
            <img :src="item.preview_image" :alt="item.name" />
          </div>

          <!--
                ?--------  infos  --------
              -->
          <div class="card_text">
            <div class="card_text_title">
              <h3>{{ item.name }}</h3>
            </div>

            <div class="card_text_price">
              <p>{{ item.calcultedPriceTTC }} €</p>
            </div>

            <nuxt-link
              :to="{
                path: `/product/clothing`,
                query: { product_id: item.id },
              }"
              class="button--secondary"
            >
              <!--svg cart here-->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M6.66683 6.33341H5.64795C4.56493 6.33341 4.02387 6.33341 3.63867 6.54332C3.30065 6.72752 3.04081 7.01848 2.90512 7.36552C2.7506 7.76074 2.83954 8.26772 3.01737 9.28132L3.01774 9.28322L3.79552 13.7166C3.92746 14.4686 3.99386 14.8448 4.19139 15.127C4.3655 15.3757 4.60992 15.5724 4.89681 15.6946C5.22227 15.8333 5.62339 15.8334 6.42594 15.8334H13.5746C14.3772 15.8334 14.778 15.8333 15.1035 15.6946C15.3904 15.5724 15.635 15.3757 15.8091 15.127C16.0066 14.8448 16.0727 14.4686 16.2046 13.7166L16.9824 9.28322L16.9831 9.28013C17.1608 8.26732 17.2497 7.76058 17.0953 7.36552C16.9596 7.01848 16.7003 6.72752 16.3623 6.54332C15.9771 6.33341 15.4352 6.33341 14.3522 6.33341H13.3335M6.66683 6.33341H13.3335M6.66683 6.33341C6.66683 4.58451 8.15921 3.16675 10.0002 3.16675C11.8411 3.16675 13.3335 4.58451 13.3335 6.33341"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Ajouter au panier
            </nuxt-link>
          </div>
        </article>
      </div>

      <button
        class="best_sellers_content_button best_sellers_content_button--next"
        v-if="navIndexMax > 1 && navIndex > 1"
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
        class="best_sellers_navigation_dot"
        :class="n == navIndex ? 'activ' : ''"
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
        const priceNumber = Number(product.price || 0)

        return {
          ...product,
          preview_image,
          calcultedPriceTTC: (priceNumber * 1.085).toFixed(2),
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
