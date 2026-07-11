<template>
  <div class="expedition_page">
    <NavigationBar />

    <ExpeditionComponent />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ExpeditionComponent from '~/components/checkout/ExpeditionComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

// import { isUserAuthenticated } from '~/middleware/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ExpeditionComponent,
    Footer,
  },
  data: function () {
    return {
      auth: true,
    }
  },
  // mounted() {
  //   this.verifyLogin()
  // },
  methods: {
    // async verifyLogin() {
    //   try {
    //     const isAuthenticated = await isUserAuthenticated()
    //     this.auth = isAuthenticated

    //     if (this.auth === false) {
    //       this.$router.push({
    //         path: '/login',
    //         query: {
    //           redirect: '/expedition',
    //         },
    //       })
    //     }
    //   } catch (error) {
    //     console.error(error)
    //     this.$router.push({
    //       path: '/login',
    //       query: {
    //         redirect: '/expedition',
    //       },
    //     })
    //   }
    // },
  },
}
</script>
