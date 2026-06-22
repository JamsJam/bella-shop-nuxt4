<template>
  <section class="about">
    <div class="about_text">
      <h2 v-html="section?.title || 'Bella'"></h2>
      <p v-html="section?.text" ></p>

      <a href="/clothes" class="button--primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
          <path
            d="M4.1665 9.5H15.8332M15.8332 9.5L10.8332 4.75M15.8332 9.5L10.8332 14.25"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Commence ton shopping
      </a>
    </div>

    <div class="about_product_slider">
      <nuxt-link
        :to="{
          path: `/product/clothing`,
          query: { product_id: currentVariant?.id },
        }"
        v-if="currentVariant"
        class="about_product_slider_item"
        :class="
          showClothing
            ? 'clothing_animation_fade_in'
            : 'clothing_animation_fade_out'
        "
      >
        <img
          :src="currentVariant.images[0]"
          alt=""
        />
        <div class="about_product_slider_item_title">
          <h3>{{ currentVariant.name }}</h3>
          <p>
            {{ currentVariant.calcultedPriceTTC }} €
          </p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { HomepageAboutDTO, HomepageHighlightsDTO } from '#shared/dto/homepage.dto'

interface ClothingVariant {
  id: number
  name: string
  images: string[]
  price: number
  promo?: number
  calcultedPriceTTC: string
}

export default {
  components: {},
  props: {
    section: {
      type: Object as PropType<HomepageAboutDTO | null>,
      default: null,
    },
    highlights: {
      type: Object as PropType<HomepageHighlightsDTO | null>,
      default: null,
    },
  },
  data() {
    return {
      clothesColorVariants: null as ClothingVariant[] | null,
      clothingSliderIndex: 0,
      showClothing: true,
      sliderInterval: null as ReturnType<typeof setInterval> | null,
    }
  },
  computed: {
    currentVariant(): ClothingVariant | null {
      return this.clothesColorVariants?.[this.clothingSliderIndex] ?? null
    },
  },
  async mounted() {
    await this.loadSliderVariants()
  },
  watch: {
    highlights: {
      handler() {
        this.$nextTick(this.loadSliderVariants)
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval)
      this.sliderInterval = null
    }
  },
  methods: {
    async loadSliderVariants() {
      if (!this.highlights?.products?.length) {
        this.clothesColorVariants = null
        return
      }

      this.clothesColorVariants = this.highlights.products.map((product: any) => {
        let images: string[]

        if (Array.isArray(product.images)) {
          images = product.images
        } else {
          try {
            images = JSON.parse(product.images)
          } catch {
            images = [String(product.images)]
          }
        }

        const priceNumber = Number(product.price || 0)
        const priceAfterDiscount = Number(
          this.calculatedPrice(priceNumber, product.promo)
        )
        const priceWithTax = (priceAfterDiscount * 1.085).toFixed(2)

        return {
          id: product.id,
          name: product.name,
          images,
          price: priceNumber,
          promo: product.promo,
          calcultedPriceTTC: priceWithTax,
        }
      })

      if (this.clothesColorVariants.length > 1) {
        this.handleSlider()
      }
    },

    calculatedPrice(price: number, promotion?: number) {
      if (promotion && promotion > 0) {
        const discountedPrice = price - price * (promotion / 100)
        return discountedPrice.toFixed(2)
      }

      return price.toFixed(2)
    },

    handleSlider() {
      if (!this.clothesColorVariants || this.clothesColorVariants.length <= 1) {
        return
      }

      if (this.sliderInterval) {
        clearInterval(this.sliderInterval)
      }

      this.sliderInterval = window.setInterval(() => {
        this.showClothing = false

        setTimeout(() => {
          if (!this.clothesColorVariants) {
            this.showClothing = true
            return
          }

          const count = this.clothesColorVariants.length
          if (this.clothingSliderIndex + 1 < count) {
            this.clothingSliderIndex++
          } else {
            this.clothingSliderIndex = 0
          }

          this.showClothing = true
        }, 1000)
      }, 6000)
    },
  },
}
</script>
