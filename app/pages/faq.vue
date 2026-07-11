<template>
  <div class="clothes_page">
    <NavigationBar />

    <FAQComponent :questions="faq?.questions" />

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import FAQComponent from '~/components/support/FAQComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    FAQComponent,
    Footer,
  },
  data: function () {
    return {
      faq: null,
    }
  },
  async mounted() {
    await this.loadFaq()
  },
  methods: {
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

