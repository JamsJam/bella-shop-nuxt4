<template>
  <div class="clothes_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <LegalsComponent :legals="legals" />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import LegalsComponent from '~/components/support/LegalsComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    LegalsComponent,
    Footer,
  },
  data: function () {
    return {
      legals: null,
    }
  },
  async mounted() {
    await this.loadLegals()
  },
  methods: {
    async loadLegals() {
      try {
        const response = await fetch('/api/page/legals')
        if (response.ok) {
          this.legals = await response.json()
        }
      } catch (error) {
        console.error('Failed to load legals content', error)
      }
    },
  },
}
</script>
