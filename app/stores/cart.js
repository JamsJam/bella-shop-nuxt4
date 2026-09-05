import { defineStore } from 'pinia'
import { useCookie } from '#app'

const cartCookieOptions = {
  default: () => [],
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30,
}

const getCartCookie = () => useCookie('bella_cart', cartCookieOptions)

const getSizeValue = (size) => size?.id || size?.name || size || 'no-size'

const getColorValue = (color) => color?.id || color?.name || 'no-color'

const buildCartItemId = (payload) =>
  [
    payload.productId || payload.productSlug,
    getColorValue(payload.color),
    getSizeValue(payload.size),
  ].join('__')

const normalizeCartItem = (payload) => ({
  id: payload.id || buildCartItemId(payload),
  productId: payload.productId || null,
  productSlug: payload.productSlug || '',
  productName: payload.productName || 'Produit',
  image: payload.image || '',
  color: payload.color || null,
  size: payload.size || null,
  unitPrice: Number(payload.unitPrice || payload.price || 0),
  quantity: Number(payload.quantity || 1),
})

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    subtotal(state) {
      return state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      )
    },
  },
  actions: {
    load() {
      const cartCookie = getCartCookie()
      this.items = Array.isArray(cartCookie.value)
        ? cartCookie.value.map((item) => normalizeCartItem(item))
        : []
    },
    save() {
      const cartCookie = getCartCookie()
      cartCookie.value = this.items
    },
    addItem(payload) {
      const item = normalizeCartItem(payload)
      const existingItem = this.items.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }

      this.save()
    },
    incrementItem(itemId) {
      const item = this.items.find((cartItem) => cartItem.id === itemId)

      if (!item) {
        return
      }

      item.quantity += 1
      this.save()
    },
    decrementItem(itemId) {
      const item = this.items.find((cartItem) => cartItem.id === itemId)

      if (!item) {
        return
      }

      if (item.quantity <= 1) {
        this.removeItem(itemId)
        return
      }

      item.quantity -= 1
      this.save()
    },
    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId)
      this.save()
    },
    clear() {
      this.items = []
      this.save()
    },
  },
})
