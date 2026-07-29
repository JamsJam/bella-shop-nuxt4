<template>
  <div class="login_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <LoginForms />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import LoginForms from '~/components/auth/LoginForms.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    LoginForms,
  },
  data: function () {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
// @use '../sass/utils' as *;
// @use '../sass/base' as *;

.login_page {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  // height: calc(100dvh - 128px);
}
</style>
