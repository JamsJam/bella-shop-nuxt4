<template>
  <div
    class="expedition_container_box_wrapper_input expedition_container_box_wrapper_input_country"
  >
    <img v-if="selectedCountry?.flag" :src="selectedCountry.flag" alt="" />

    <div class="expedition_container_box_wrapper_input_select_country">
      <label for="delivery-country">Pays</label>
      <select
        id="delivery-country"
        v-model="selectedCountryCode"
        :disabled="disabled || loading"
        required
      >
        <option
          v-for="country in shippingStore.countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }} - {{ formatPrice(country.deliveryFee) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { useShippingStore } from '~/stores/shipping'

export default {
  name: 'DeliveryCountrySelect',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup() {
    const shippingStore = useShippingStore()

    return {
      shippingStore,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    selectedCountry() {
      return this.shippingStore.selectedCountry
    },
    selectedCountryCode: {
      get() {
        return this.shippingStore.selectedCountryCode
      },
      set(countryCode) {
        this.shippingStore.selectCountry(countryCode)
        this.$emit('change', this.shippingStore.selectedCountry)
      },
    },
  },
  async mounted() {
    this.loading = true
    this.shippingStore.load()

    try {
      await this.shippingStore.fetchCountries()
      this.$emit('change', this.shippingStore.selectedCountry)
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(price || 0))
    },
  },
}
</script>
