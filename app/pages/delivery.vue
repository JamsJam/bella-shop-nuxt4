<template>
  <div class="clothes_page">
    <NavigationBar />

    <DeliveryComponent />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import DeliveryComponent from '~/components/support/DeliveryComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'DeliveryPage',
  components: {
    NavigationBar,
    DeliveryComponent,
    Footer,
  },
  data() {
    return {}
  },
}
</script>
