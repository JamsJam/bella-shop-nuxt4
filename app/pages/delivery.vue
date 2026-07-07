<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <DeliveryComponent :auth="auth" />

    <Footer :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import DeliveryComponent from '~/components/support/DeliveryComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'DeliveryPage',
  components: {
    NavigationBar,
    DeliveryComponent,
    Footer,
  },
  data() {
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
