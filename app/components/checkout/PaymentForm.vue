<template>
  <div class="checkout_form">
    <div class="checkout_form_cgv">
      <input type="checkbox" id="cgvCheckbox" v-model="cgvAccepted" />
      <label for="cgvCheckbox">
        J'accepte les
        <NuxtLink to="/legals">conditions générales de vente</NuxtLink>
        de Bella
      </label>
    </div>

    <a
      v-if="checkoutSessionUrl"
      :href="cgvAccepted ? checkoutSessionUrl : undefined"
      class="button--primary checkout_form_payment_link"
      :aria-disabled="!cgvAccepted"
      @click="handlePaymentClick"
    >
      Payer
    </a>

    <button
      v-else
      type="button"
      class="button--primary"
      :disabled="loadingStatus"
      @click="createCheckoutSession"
    >
      Préparer le paiement
    </button>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import PopupComponent from '~/components/attachable/PopupComponent.vue'
import { humanizeErrorMessage } from '~/utils/humanizeErrorMessage'
import { useShippingStore } from '~/stores/shipping'

export default {
  components: {
    PopupComponent,
  },
  props: {
    cartData: {
      type: Array,
      default: () => [],
    },
    shipping: {
      type: Number,
      default: null,
    },
    shippingInfo: {
      type: Object,
      default: null,
    },
    auth: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const shippingStore = useShippingStore()

    return {
      shippingStore,
    }
  },
  data() {
    return {
      checkoutSessionUrl: null,
      popupMessage: null,
      cgvAccepted: false,
      loadingStatus: false,
    }
  },
  mounted() {
    this.shippingStore.load()
    this.createCheckoutSession()
  },
  methods: {
    getErrorMessage(error) {
      return humanizeErrorMessage(
        error,
        'Impossible de préparer le paiement. Veuillez réessayer.'
      )
    },
    getCheckoutSessionUrl(data) {
      return (
        data?.url ||
        data?.checkoutUrl ||
        data?.checkout_url ||
        data?.sessionUrl ||
        data?.session_url ||
        data?.stripeSessionUrl ||
        data?.stripe_session_url ||
        null
      )
    },
    async readResponseData(response) {
      try {
        return await response.json()
      } catch {
        return null
      }
    },
    async createCheckoutSession() {
      this.loadingStatus = true
      this.popupMessage = null

      try {
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            shipping: this.shippingStore.checkoutPayload,
          }),
        })

        const data = await this.readResponseData(response)

        if (!response.ok || data?.error || data?.success === false) {
          throw new Error(this.getErrorMessage(data?.error || data?.message))
        }

        const sessionUrl = this.getCheckoutSessionUrl(data)

        if (!sessionUrl) {
          throw new Error("La session Stripe n'a pas retourné de lien.")
        }

        this.checkoutSessionUrl = sessionUrl
      } catch (error) {
        const message = this.getErrorMessage(error)
        console.error('Erreur lors de la création de la session Stripe:', message)
        this.popupMessage = {
          type: 'error',
          message,
        }
      } finally {
        this.loadingStatus = false
      }
    },
    handlePaymentClick(event) {
      if (this.cgvAccepted) {
        return
      }

      event.preventDefault()
      this.popupMessage = {
        type: 'error',
        message: 'Vous devez accepter les conditions générales de vente.',
      }
    },
  },
}
</script>
