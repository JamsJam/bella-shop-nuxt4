<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <FAQComponent :auth="auth" :questions="faq?.questions" />

    <Footer :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import FAQComponent from '~/components/support/FAQComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    FAQComponent,
    Footer,
  },
  data: function () {
    return {
      auth: false,
      faq: null,
    }
  },
  async mounted() {
    await Promise.all([this.verifyLogin(), this.loadFaq()])
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
    async loadFaq() {
      try {
        const response = await fetch('/api/page/faq')
        if (response.ok) {
          this.faq = await response.json()
        }
      } catch (error) {
        console.error('Failed to load FAQ', error)
      }
    },
  },
}
</script>


