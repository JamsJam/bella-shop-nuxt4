<template>
  <div class="clothes_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <AvatarCreation :initial-skin-colors="skinColorData?.skinColors || []" />

    <Foooter />
  </div>
</template>

<script setup>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import AvatarCreation from '~/components/avatar/AvatarCreation.vue'
import Foooter from '~/components/attachable/Footer.vue'

const { data: skinColorData } = await useFetch('/api/avatar/skin-colors')
</script>

<style lang="scss">
// @use "../sass/utils" as *;
// @use "../sass/base" as *;

.clothes_page {
  position: relative;
  overflow: hidden;
}
</style>
