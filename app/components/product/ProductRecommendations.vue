<template>
  <section v-if="clothes.length" class="product_recommendations">
    <h2>Vous aimerez aussi</h2>

    <div class="product_recommendations_grid">
      <NuxtLink
        v-for="clothe in clothes"
        :key="clothe.slug"
        :to="`/clothes/${clothe.slug}`"
        class="product_recommendations_card"
      >
        <div class="product_recommendations_image">
          <img :src="clothe.image || clothe.images?.[0] || ''" :alt="clothe.name" />
        </div>

        <div class="product_recommendations_content">
          <h3>{{ clothe.name }}</h3>
          <p v-if="clothe.price !== undefined">{{ formatPrice(clothe.price) }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  clothes: {
    type: Array,
    default: () => [],
  },
})

const formatPrice = (price) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
</script>
