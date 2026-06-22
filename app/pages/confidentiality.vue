<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <ConfidentialityComponent :auth="auth" />

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
    }
  },
  mounted() {
    this.verifyLogin()
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
  },
}
</script>

<style lang="scss">
// @use "../sass/utils" as *;
// @use "../sass/base" as *;

.clothes_page {
  position: relative;
  overflow: hidden;
}
</style>
