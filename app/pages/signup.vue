<template>
  <div class="signup_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <SignUpForm />
  </div>
</template>

<script>
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import SignUpForm from '~/components/auth/SignUpForm.vue'

export default {
  name: 'SignUpPage',
  components: {
    NavigationBar,
    SignUpForm,
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

.signup_page {
  overflow: hidden;
}
</style>
