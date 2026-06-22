<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <ReturnsPolitics :auth="auth" />

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
@use '../sass/utils' as *;
@use '../sass/base' as *;

.clothes_page {
  position: relative;
  overflow: hidden;
}
</style>
