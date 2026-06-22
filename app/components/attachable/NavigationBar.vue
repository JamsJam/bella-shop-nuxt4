<template>
  <div class="navigation_system">
    <!-- Button to open menu-->
    <button class="navigation_bar" @click="openNavMenu()">
      <!--!<div class="navigation_bar_menu_icon">-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 21 21"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 6.5h12m-12.002 4h11.997M4.5 14.5h11.995"
        />
      </svg>
      <p>Menu</p>
    </button>

    <img
      src="/images/logos/bella_logo_white.png"
      alt="logo de bella"
      class="navigation_system__logo"
    />

    <!-- Si l'utilisateur n'est pas connecté -->

    <ul v-if="auth === false" class="navigation_system__action">
      <li>
        <a href="/login" class="nav__action">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M24 25.3333C24 22.3877 20.4183 19.9999 16 19.9999C11.5817 19.9999 8 22.3877 8 25.3333M16 15.9999C13.0545 15.9999 10.6667 13.6121 10.6667 10.6666C10.6667 7.72107 13.0545 5.33325 16 5.33325C18.9455 5.33325 21.3333 7.72107 21.3333 10.6666C21.3333 13.6121 18.9455 15.9999 16 15.9999Z"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span> Compte </span>
        </a>
      </li>

      <li>
        <a href="/cart" class="nav__action">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M10.6668 10.6666H10.2814C8.99732 10.6666 8.35554 10.6666 7.8348 10.9002C7.37577 11.1061 6.98471 11.4378 6.70612 11.8567C6.39008 12.3319 6.28384 12.9651 6.07273 14.2317L4.82829 21.6984L4.82779 21.7011C4.54321 23.4086 4.40084 24.2628 4.6481 24.9285C4.86519 25.513 5.28093 26.0028 5.82178 26.3131C6.43808 26.6666 7.30384 26.6666 9.03662 26.6666H22.9634C24.6961 26.6666 25.5633 26.6666 26.1796 26.3131C26.7205 26.0028 27.1352 25.513 27.3523 24.9285C27.5995 24.2631 27.4572 23.4093 27.1728 21.7031L27.1717 21.6984L25.9272 14.2317C25.7161 12.9651 25.6105 12.3319 25.2944 11.8567C25.0158 11.4378 24.6245 11.1061 24.1655 10.9002C23.6447 10.6666 23.0034 10.6666 21.7193 10.6666H21.3335M10.6668 10.6666H21.3335M10.6668 10.6666C10.6668 7.72107 13.0546 5.33325 16.0002 5.33325C18.9457 5.33325 21.3335 7.72107 21.3335 10.6666"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span> Panier </span>
        </a>
      </li>
    </ul>

    <!-- Si l'utilisateur est connecté -->
    <ul v-if="auth === true" class="navigation_system__action">


      <li>
        <a href="/account" class="nav__action">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M24 25.3333C24 22.3877 20.4183 19.9999 16 19.9999C11.5817 19.9999 8 22.3877 8 25.3333M16 15.9999C13.0545 15.9999 10.6667 13.6121 10.6667 10.6666C10.6667 7.72107 13.0545 5.33325 16 5.33325C18.9455 5.33325 21.3333 7.72107 21.3333 10.6666C21.3333 13.6121 18.9455 15.9999 16 15.9999Z"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span> Compte </span>
        </a>
      </li>

      <li>
        <a href="/cart" class="nav__action">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M10.6668 10.6666H10.2814C8.99732 10.6666 8.35554 10.6666 7.8348 10.9002C7.37577 11.1061 6.98471 11.4378 6.70612 11.8567C6.39008 12.3319 6.28384 12.9651 6.07273 14.2317L4.82829 21.6984L4.82779 21.7011C4.54321 23.4086 4.40084 24.2628 4.6481 24.9285C4.86519 25.513 5.28093 26.0028 5.82178 26.3131C6.43808 26.6666 7.30384 26.6666 9.03662 26.6666H22.9634C24.6961 26.6666 25.5633 26.6666 26.1796 26.3131C26.7205 26.0028 27.1352 25.513 27.3523 24.9285C27.5995 24.2631 27.4572 23.4093 27.1728 21.7031L27.1717 21.6984L25.9272 14.2317C25.7161 12.9651 25.6105 12.3319 25.2944 11.8567C25.0158 11.4378 24.6245 11.1061 24.1655 10.9002C23.6447 10.6666 23.0034 10.6666 21.7193 10.6666H21.3335M10.6668 10.6666H21.3335M10.6668 10.6666C10.6668 7.72107 13.0546 5.33325 16.0002 5.33325C18.9457 5.33325 21.3335 7.72107 21.3335 10.6666"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span> Panier </span>
        </a>
      </li>
    </ul>

    <!-- context menu -->
    <div
      ref="navigationMenu"
      v-if="navigationMenuDisplay"
      class="navigation_menu"
    >
      <div class="navigation_menu_link_container">
        <div class="navigation_menu_link">
          <a href="/">Accueil</a>
        </div>
        <div class="navigation_menu_link">
          <a href="/clothes">Shop ta tenue</a>
        </div>
        <div class="navigation_menu_link">
          <a href="/avatar">Mon avatar</a>
        </div>
        <div class="navigation_menu_link">
          <nuxt-link :to="auth ? '/account' : '/login'">Mon compte</nuxt-link>
        </div>
      </div>



      <button class="navigation_menu_close_icon" @click="closeNavMenu()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 21 21"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(2 2)"
          >
            <circle cx="8.5" cy="8.5" r="8" />
            <path d="m5.5 5.5l6 6m0-6l-6 6" />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navigationMenuDisplay: false,
    }
  },
  mounted() {},
  methods: {
    openNavMenu() {
      this.navigationMenuDisplay = true
      setTimeout(() => {
        const navigationMenuRef = this.$refs.navigationMenu
        navigationMenuRef.style.opacity = 1
      }, 50)
    },
    closeNavMenu() {
      const navigationMenuRef = this.$refs.navigationMenu
      navigationMenuRef.style.opacity = 0

      setTimeout(() => {
        this.navigationMenuDisplay = false
      }, 300)
    },
  },
}
</script>
