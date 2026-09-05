<template>
  <header class="category_page_header">
    <NuxtLink to="/category" class="back_link category_page_header_back">
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
  width: min(90dvw, 75rem);
  margin: 5rem auto 2.5rem;
}

.category_page_header_back {
  margin-bottom: 1.25rem;
}

.category_page_header_title {
  margin: 0;
  font-size: clamp(2rem, 5dvw, 4rem);
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
