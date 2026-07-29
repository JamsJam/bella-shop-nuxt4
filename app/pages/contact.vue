<template>
  <div class="contact_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <ContactComponent />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ContactComponent from '~/components/account/ContactComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ContactPage',
  components: {
    NavigationBar,
    ContactComponent,
    Footer,
  },
}
</script>
