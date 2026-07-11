<template>
  <div class="clothes_page">
    <NavigationBar />

    <AvatarCreation />

    <Foooter />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import AvatarCreation from '~/components/avatar/AvatarCreation.vue'
import Foooter from '~/components/attachable/Footer.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    AvatarCreation,
    Foooter,
  },
  data: function () {
    return {}
  },
}
</script>

<style lang="scss">
// @use "../sass/utils" as *;
// @use "../sass/base" as *;

.clothes_page {
  position: relative;
  overflow: hidden;
}
</style>
