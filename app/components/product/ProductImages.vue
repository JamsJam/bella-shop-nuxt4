<template>
  <section class="product_images" aria-label="Images du produit">
    <div class="product_images_main">
      <img :src="featuredImage.src" :alt="featuredImage.alt || productName" />
    </div>

    <div class="product_images_carousel" aria-label="Choisir une image">
      <button
        v-for="(image, index) in normalizedImages"
        :key="image.id || image.src"
        type="button"
        class="product_images_carousel_item"
        :class="{ product_images_carousel_item_active: selectedIndex === index }"
        :aria-label="`Afficher l'image ${index + 1}`"
        @click="selectedIndex = index"
      >
        <img :src="image.src" :alt="image.alt || productName" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductImages',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    productName: {
      type: String,
      default: 'Produit',
    },
  },
  data() {
    return {
      selectedIndex: 0,
    }
  },
  computed: {
    normalizedImages() {
      if (this.images.length > 0) {
        return this.images
      }

      return [
        {
          id: 'placeholder',
          src: '/images/clothes/category_banniere.jpg',
          alt: this.productName,
        },
      ]
    },
    featuredImage() {
      return this.normalizedImages[this.selectedIndex] || this.normalizedImages[0]
    },
  },
  watch: {
    images() {
      this.selectedIndex = 0
    },
  },
}
</script>
