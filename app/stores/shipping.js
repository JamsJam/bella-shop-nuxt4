import { defineStore } from 'pinia'
import { useCookie } from '#app'

const shippingCookieOptions = {
  default: () => null,
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30,
}

const getShippingCookie = () =>
  useCookie('bella_shipping', shippingCookieOptions)

const normalizeCountry = (country) => ({
  code: country.code || country.value || country.isoCode || '',
  name: country.name || country.label || '',
  flag: country.flag || '',
  deliveryFee: Number(
    country.deliveryFee ?? country.shippingFee ?? country.price ?? 0
  ),
})

export const useShippingStore = defineStore('shipping', {
  state: () => ({
    countries: [],
    selectedCountryCode: null,
    shippingInfo: null,
  }),
  getters: {
    selectedCountry(state) {
      return (
        state.countries.find(
          (country) => country.code === state.selectedCountryCode
        ) || null
      )
    },
    selectedDeliveryCost() {
      return Number(this.selectedCountry?.deliveryFee || 0)
    },
    checkoutPayload() {
      return {
        selectedCountryCode: this.selectedCountryCode,
        shippingInfo: this.shippingInfo,
      }
    },
  },
  actions: {
    load() {
      const shippingCookie = getShippingCookie()

      if (shippingCookie.value?.selectedCountryCode) {
        this.selectedCountryCode = shippingCookie.value.selectedCountryCode
      }

      if (shippingCookie.value?.shippingInfo) {
        this.shippingInfo = shippingCookie.value.shippingInfo
      }
    },
    save() {
      const shippingCookie = getShippingCookie()

      shippingCookie.value = {
        selectedCountryCode: this.selectedCountryCode,
        shippingInfo: this.shippingInfo,
      }
    },
    async fetchCountries() {
      const countries = await $fetch('/api/shipping/countries')
      this.countries = Array.isArray(countries)
        ? countries.map((country) => normalizeCountry(country))
        : []

      if (!this.selectedCountryCode && this.countries.length > 0) {
        this.selectCountry(this.countries[0].code)
      }
    },
    selectCountry(countryCode) {
      this.selectedCountryCode = countryCode
      this.save()
    },
    setShippingInfo(shippingInfo) {
      this.shippingInfo = shippingInfo
      this.save()
    },
  },
})
