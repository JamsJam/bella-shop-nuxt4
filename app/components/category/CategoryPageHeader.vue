<template>
  <header class="category_page_header">
    <NuxtLink to="/category" class="category_page_header_back">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
        <path
          d="M12.4998 15.0416L6.6665 9.49992L12.4998 3.95825"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Retour aux catégories
    </NuxtLink>
    <h1 class="category_page_header_title">{{ categoryName }}</h1>
    <p class="category_page_header_text">
      Craquez pour notre collection de {{ categoryName }}
    </p>
  </header>
</template>

<script>
import { deslugify } from '~/utils/utils'

export default {
  props: {
    slug: {
      type: String,
      default: '',
    },
  },
  computed: {
    categoryName() {
      return deslugify(this.slug)
    },
  },
}
</script>

<style lang="scss" scoped>
.category_page_header {
  width: min(90vw, 1200px);
  margin: 5rem auto 2.5rem;
}

.category_page_header_back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: inherit;
  font-size: 0.95rem;
  text-decoration: none;
}

.category_page_header_back svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
}

.category_page_header_title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1;
}

.category_page_header_text {
  max-width: 42rem;
  margin: 1rem 0 0;
  font-size: 1.125rem;
  line-height: 1.6;
}
</style>
