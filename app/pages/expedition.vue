<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <ExpeditionComponent :auth="auth" />

    <Footer :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ExpeditionComponent from '~/components/checkout/ExpeditionComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ExpeditionComponent,
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

        if (this.auth === false) {
          this.$router.push('/login')
        }
      } catch (error) {
        console.error(error)
        this.$router.push('/login')
      }
    },
  },
}
</script>

