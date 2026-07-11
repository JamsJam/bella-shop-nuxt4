<template>
  <div class="category_page">
    <NavigationBar />

    <CategoryPageHeader :slug="categorySlug" />

    <CategoryClothes :categoryData="categoryData" />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import CategoryPageHeader from '~/components/category/CategoryPageHeader.vue'
import CategoryClothes from '~/components/category/CategoryClothes.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesCategory',
  components: {
    NavigationBar,
    CategoryPageHeader,
    CategoryClothes,
    Footer,
  },
  data: function () {
    return {
      categoryData: null,
      pending: false,
    }
  },
  async mounted() {
    await this.fetchCategoryData()
  },
  computed: {
    categorySlug() {
      return String(this.$route.params.slug || '')
    },
  },
  methods: {
    async fetchCategoryData() {
      try {
        this.pending = true
        const slug = this.$route.params.slug
        const response = await $fetch(`/api/category/${slug}`)
        this.categoryData = response
      } catch (error) {
        console.error('Erreur lors du chargement de la catégorie:', error)
        this.categoryData = null
      } finally {
        this.pending = false
      }
    },
  },
}
</script>

<style lang="scss">


.category_page {
  position: relative;
  overflow: hidden;
}
</style>
