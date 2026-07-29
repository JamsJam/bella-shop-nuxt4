<template>
  <div class="clothes_page">
    <NavigationBar  />
    <AttachableBreadcrumb />

    <ForgotPasswordComponent  />

    <Footer  />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ForgotPasswordComponent from '~/components/auth/ForgotPasswordComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ForgotPasswordComponent,
    Footer,
  },
}
</script>
