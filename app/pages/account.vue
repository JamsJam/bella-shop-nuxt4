<template>
  <div class="account_page">
    <NavigationBar />

    <AccountComponent :initial-profile="initialProfile" />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import AccountComponent from '~/components/account/AccountComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

defineOptions({
  name: 'AccountPage',
})

type AccountProfile = {
  surname: string
  name: string
  email: string
}

type AccountProfileResponse = {
  userProfil?: AccountProfile[]
}

definePageMeta({
  middleware: 'auth',
})

useSeoMeta({
  title: 'Mon compte | Bella',
  robots: 'noindex, nofollow',
})

const { data: profileResponse } = await useFetch<AccountProfileResponse>(
  '/api/account/profile',
  {
    credentials: 'include',
  }
)

const initialProfile = computed<AccountProfile | undefined>(
  () => profileResponse.value?.userProfil?.[0]
)
</script>
