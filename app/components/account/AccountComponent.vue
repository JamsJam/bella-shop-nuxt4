<template>
  <div class="account">
    <div class="account_container">
      <nav class="account_container_menu" aria-label="Navigation du compte">
        <button
          type="button"
          class="account_container_menu_link"
          :class="{ active_account_page: currentAccountPage === 'profil' }"
          :aria-pressed="currentAccountPage === 'profil'"
          @click="switchAccountPage('profil')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 21 21"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3zm7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"
            />
          </svg>
          <span>Infos personnelles</span>
        </button>
        <button
          type="button"
          class="account_container_menu_link"
          :class="{ active_account_page: currentAccountPage === 'orders' }"
          :aria-pressed="currentAccountPage === 'orders'"
          @click="switchAccountPage('orders')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 21 21"
            aria-hidden="true"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="m11.492 4.067l5 2.857A2 2 0 0 1 17.5 8.661v4.678a2 2 0 0 1-1.008 1.737l-5 2.857a2 2 0 0 1-1.984 0l-5-2.857A2 2 0 0 1 3.5 13.339V8.661a2 2 0 0 1 1.008-1.737l5-2.857a2 2 0 0 1 1.984 0zM14 9.5l-7-4"
              />
              <path d="m4 8l5.552 2.99a2 2 0 0 0 1.896 0L17 8m-6.5 3.5V18" />
            </g>
          </svg>
          <span>Commandes</span>
        </button>
      </nav>

      <AccountProfilComponent
        v-if="currentAccountPage === 'profil'"
        :initial-profile="initialProfile"
      />
      <AccountOrdersComponent
        v-else-if="currentAccountPage === 'orders'"
        :initial-orders="initialOrders"
        :orders-loading="ordersLoading"
        :orders-error="ordersError"
        @retry-orders="$emit('retry-orders')"
        @request-clothing-return="handleRequestClothingReturn"
      />
      <AccountReturnsComponent
        v-else-if="currentAccountPage === 'returns'"
        :request-clothing-return="requestClothingReturn"
        @valid-return-request="handleSuccessReturnRequest"
      />
    </div>
  </div>
</template>

<script>
import AccountProfilComponent from '~/components/account/AccountProfilComponent.vue'
import AccountOrdersComponent from '~/components/account/AccountOrdersComponent.vue'
import AccountReturnsComponent from '~/components/account/AccountReturnsComponent.vue'

export default {
  components: {
    AccountProfilComponent,
    AccountOrdersComponent,
    AccountReturnsComponent,
  },
  props: {
    initialProfile: {
      type: Object,
      default: null,
    },
    initialOrders: {
      type: Array,
      default: () => [],
    },
    ordersLoading: {
      type: Boolean,
      default: false,
    },
    ordersError: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentAccountPage: 'profil',
      requestClothingReturn: null,
    }
  },
  methods: {
    switchAccountPage(page) {
      this.currentAccountPage = page
    },

    handleRequestClothingReturn(requestClothingReturn) {
      this.requestClothingReturn = requestClothingReturn
      this.currentAccountPage = 'returns'
    },

    handleSuccessReturnRequest() {
      this.requestClothingReturn = null
    },
  },
}
</script>
