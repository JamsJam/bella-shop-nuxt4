<template>
  <div class="account_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <AccountComponent
      :initial-profile="initialProfile"
      :initial-orders="initialOrders"
      :orders-loading="ordersPending"
      :orders-error="ordersErrorMessage"
      @retry-orders="handleRetryOrders"
    />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import AccountComponent from '~/components/account/AccountComponent.vue'
import Footer from '~/components/attachable/Footer.vue'
import type CustomerDTO from '#shared/dto/customer.dto'
import type { CustomerOrderListDTO } from '#shared/dto/customer.dto'

defineOptions({
  name: 'AccountPage',
})

useSeoMeta({
  title: 'Mon compte | Bella',
  robots: 'noindex, nofollow',
})

const profileRequest = useFetch<CustomerDTO>('/api/account/profile')
const ordersRequest = useFetch<CustomerOrderListDTO>('/api/account/orders')
const [
  { data: profile, error: profileError },
  {
    data: ordersResponse,
    pending: ordersPending,
    error: ordersError,
    refresh: refreshOrders,
  },
] = await Promise.all([profileRequest, ordersRequest])

if (profileError.value?.statusCode === 401) {
  await navigateTo({
    path: '/login',
    query: { redirect: '/account' },
  })
}

const initialProfile = computed<CustomerDTO | undefined>(
  () => profile.value ?? undefined
)
const initialOrders = computed(() => ordersResponse.value?.orders ?? [])
const ordersErrorMessage = computed(() =>
  ordersError.value ? 'Impossible de récupérer vos commandes.' : ''
)
const handleRetryOrders = () => refreshOrders()
</script>
