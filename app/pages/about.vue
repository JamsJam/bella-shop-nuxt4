<template>
  <div>
    <NavigationBar />
    <AttachableBreadcrumb />

    <main>
      <h1>À propos</h1>
      <NuxtLink to="/">Accueil</NuxtLink>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import Footer from '~/components/attachable/Footer.vue'
</script>
