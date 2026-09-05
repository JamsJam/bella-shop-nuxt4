<template>
  <div class="clothes_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <SAVComponent />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import SAVComponent from '~/components/support/SAVComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    SAVComponent,
    Footer,
  },
  data: function () {
    return {}
  },
}
</script>
