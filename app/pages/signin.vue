<template>
  <div class="signin_page">
    <NavigationBar />

    <SignInForms />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import SignInForms from '~/components/auth/SignInForms.vue'

export default {
  name: 'ClothesPage',
  components: {
    NavigationBar,
    SignInForms,
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

.signin_page {
  overflow: hidden;
}
</style>
