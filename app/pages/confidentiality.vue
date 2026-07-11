<template>
  <div class="clothes_page">
    <NavigationBar />

    <ConfidentialityComponent :blocks="confidentiality?.blocks" />

    <Foooter />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ConfidentialityComponent from '~/components/support/ConfidentialityComponent.vue'
import Foooter from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    ConfidentialityComponent,
    Foooter,
  },
  data: function () {
    return {
      confidentiality: null,
    }
  },
  async mounted() {
    await this.loadConfidentiality()
  },
  methods: {
    async loadConfidentiality() {
      try {
        const response = await fetch('/api/page/confidentiality')
        if (response.ok) {
          this.confidentiality = await response.json()
        }
      } catch (error) {
        console.error('Failed to load confidentiality content', error)
      }
    },
  },
}
</script>

