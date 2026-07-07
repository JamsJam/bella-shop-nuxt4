<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <LegalsComponent :auth="auth" :legals="legals" />

    <Footer :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import LegalsComponent from '~/components/support/LegalsComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    LegalsComponent,
    Footer,
  },
  data: function () {
    return {
      auth: false,
      legals: null,
    }
  },
  async mounted() {
    await Promise.all([this.verifyLogin(), this.loadLegals()])
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
    async loadLegals() {
      try {
        const response = await fetch('/api/page/legals')
        if (response.ok) {
          this.legals = await response.json()
        }
      } catch (error) {
        console.error('Failed to load legals content', error)
      }
    },
  },
}
</script>


