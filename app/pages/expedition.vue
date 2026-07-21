<template>
  <div class="expedition_page">
    <NavigationBar />

    <ExpeditionComponent
      :initial-countries="countries || []"
      :initial-vat="vatConfig?.vat || 0"
    />

    <Footer />
  </div>
</template>

<script setup>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ExpeditionComponent from '~/components/checkout/ExpeditionComponent.vue'
import Footer from '~/components/attachable/Footer.vue'
import { isUserAuthenticated } from '~/middleware/auth'

const router = useRouter()
const auth = ref(false)

const [{ data: countries }, { data: vatConfig }] = await Promise.all([
  useFetch('/api/shipping/countries'),
  useFetch('/api/shipping/vat'),
])

onMounted(async () => {
  try {
    auth.value = await isUserAuthenticated()

    if (!auth.value) {
      await router.push({
        path: '/login',
        query: { redirect: '/expedition' },
      })
    }
  } catch (error) {
    console.error(error)
    await router.push({
      path: '/login',
      query: { redirect: '/expedition' },
    })
  }
})
</script>
