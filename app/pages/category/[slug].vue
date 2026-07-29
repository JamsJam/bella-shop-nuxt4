<template>
  <div class="category_page">
    <NavigationBar />
    <AttachableBreadcrumb :page-data="{ name: categoryName }" />

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
      categoryName: '',
      pending: false,
    }
  },
  async mounted() {
    await Promise.all([
      this.fetchCategoryData(),
      this.fetchCategoryName(),
    ])
  },
  computed: {
    categorySlug() {
      return String(this.$route.params.slug || '')
    },
  },
  methods: {
    async fetchCategoryName() {
      try {
        const categoryPage = await $fetch('/api/category')
        const category = categoryPage?.categories?.find(
          (item) => item.slug === this.categorySlug
        )

        this.categoryName = category?.name || ''
      } catch (error) {
        console.error('Erreur lors du chargement du nom de la catégorie:', error)
        this.categoryName = ''
      }
    },
    async fetchCategoryData() {
      try {
        this.pending = true
        const slug = this.$route.params.slug
        const response = await $fetch(`/api/category/${encodeURIComponent(slug)}`)
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
