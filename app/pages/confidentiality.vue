<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <ConfidentialityComponent :auth="auth" :blocks="confidentiality?.blocks" />

    <Foooter :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ConfidentialityComponent from '~/components/support/ConfidentialityComponent.vue'
import Foooter from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ConfidentialityComponent,
    Foooter,
  },
  data: function () {
    return {
      auth: false,
      confidentiality: null,
    }
  },
  async mounted() {
    await Promise.all([this.verifyLogin(), this.loadConfidentiality()])
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
    async loadConfidentiality() {
      try {
        const response = await fetch('/api/page/confidentiality')
        if (response.ok) {
          this.confidentiality = await response.json()
        }
      } catch (error) {
        console.error('Failed to load confidentiality content', error)
      }
    },
  },
}
</script>


