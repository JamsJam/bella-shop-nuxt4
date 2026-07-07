<template>
  <div class="clothes_page">
    <NavigationBar :auth="auth" />

    <AvatarCreation :auth="auth" />

    <Foooter :auth="auth" />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import AvatarCreation from '~/components/avatar/AvatarCreation.vue'
import Foooter from '~/components/attachable/Footer.vue'

import { verifyLogin } from '~/utils/auth'
import { useRuntimeConfig } from '#imports'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    AvatarCreation,
    Foooter,
  },
  data: function () {
    return {
      auth: false,
    }
  },
  setup() {
    return {
      config: useRuntimeConfig(),
    }
  },
  mounted() {
    this.verifyLogin()
  },
  methods: {
    async verifyLogin() {
      try {
        const apiUrl =
          this.config.public.platformApiBase || this.config.platformApiBase
        const isAuthenticated = await verifyLogin(apiUrl)
        this.auth = isAuthenticated
      } catch (error) {
        this.auth = false
      }
    },
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
