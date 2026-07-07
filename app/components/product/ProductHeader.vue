<template>
  <header class="product_header">
    <h1>{{ name }}</h1>
    <p class="product_header_price">{{ formattedPrice }}</p>
    <p class="product_header_description">{{ description }}</p>
  </header>
</template>

<script>
export default {
  name: 'ProductHeader',
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(this.price)
    },
  },
}
</script>
