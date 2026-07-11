<template>
  <div class="clothes_page">
    <NavigationBar />

    <ReturnsPolitics :blocks="returnsPage?.blocks" />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ReturnsPolitics from '~/components/support/ReturnsPolitics.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ReturnsPolitics,
    Footer,
  },
  data: function () {
    return {
      returnsPage: null,
    }
  },
  async mounted() {
    await this.loadReturnsPage()
  },
  methods: {
    async loadReturnsPage() {
      try {
        const response = await fetch('/api/page/returns')
        if (response.ok) {
          this.returnsPage = await response.json()
        }
      } catch (error) {
        console.error('Failed to load returns page content', error)
      }
    },
  },
}
</script>
