<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <ReturnsPolitics :auth="auth" :blocks="returnsPage?.blocks" />

    <Footer :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ReturnsPolitics from '~/components/support/ReturnsPolitics.vue'
import Footer from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ReturnsPolitics,
    Footer,
  },
  data: function () {
    return {
      auth: false,
      returnsPage: null,
    }
  },
  async mounted() {
    await Promise.all([this.verifyLogin(), this.loadReturnsPage()])
  },
  methods: {
    async verifyLogin() {
      try {
        const isAuthenticated = await verifyLogin(this.$store.state.apiUrl)
        this.auth = isAuthenticated
      } catch (error) {
        this.auth = false
      }
    },
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

