<template>
  <div class="account_container_orders_page">
    <div class="account_container_title">
      <h1>Vos commandes</h1>
      <p>Retrouvez vos dernières commandes</p>
    </div>

    <div
      v-if="ordersLoading"
      class="account_container_orders account_container_orders_empty"
      role="status"
    >
      <p>Chargement de vos commandes...</p>
    </div>

    <div
      v-else-if="ordersError"
      class="account_container_orders account_container_orders_empty"
      role="alert"
    >
      <p>{{ ordersError }}</p>
      <button type="button" class="button--secondary" @click="fetchOrders()">
        Réessayer
      </button>
    </div>

    <div
      v-else-if="orders.length === 0"
      class="account_container_orders account_container_orders_empty"
    >
      <p>Vous n'avez pas encore passé de commande.</p>
    </div>

    <div v-else class="account_container_orders">
      <div
        v-for="(order, index) in orders"
        :key="order.id || order.invoiceId || index"
        class="account_container_orders_item"
        :class="{ current_orders_item: currentOrderIndex === index }"
        @click="handleCurrentOrder(index)"
      >
        <div class="account_container_orders_item_title">
          <h4>Commande n°{{ order.invoiceId }}</h4>
          <p>
            {{ order.created_at.date }} / {{ order.created_at.month }} /
            {{ order.created_at.year }}
          </p>
          <p class="account_container_orders_item_title_status">
            {{ order.status }}
          </p>
          <p>
            <strong
              >Livraison prévue :
              {{ order.shippingInfo?.deliveryDate?.formattedDate || 'À confirmer' }}</strong
            >
          </p>
        </div>

        <div class="account_container_orders_item_cart">
          <div
            v-for="(product, index) in order.cartData"
            :key="index"
            class="account_container_orders_item_cart_product"
          >
            <div class="account_container_orders_item_cart_product_title">
              <nuxt-link
                :to="{
                  path: `/product/clothing`,
                  query: { product_id: product.id },
                }"
                >{{ product.name }}</nuxt-link
              >
              <p>
                {{ product.color?.name || 'Couleur non renseignée' }} /
                {{ product.size?.name || 'Taille non renseignée' }}
              </p>
              <!--
                  <button v-if="order.status === 'Livrée' && canRequestReturn(order.shippingInfo.deliveryDate.formattedDateYYYYMMDD)" @click="requestClothingReturn(product, order.invoiceId)">Demande de retour</button>
                  -->
            </div>

            <div class="account_container_orders_item_cart_product_quantity">
              <span>x{{ product.quantity }}</span>
            </div>

            <div class="account_container_orders_item_cart_product_price">
              <p>x{{ product.price + ' €' }}</p>
            </div>

            <div class="account_container_orders_item_cart_product_total">
              <p>{{ product.subTotal + ' €' }}</p>
            </div>
          </div>
        </div>

        <div class="account_container_orders_item_shipping">
          <div class="account_container_orders_item_shipping_address">
            <h5>Adresse de livraison :</h5>
            <p>
              {{
                order.shippingInfo?.fullAddress?.display_name ||
                order.shippingInfo?.address ||
                'Adresse non renseignée'
              }}
            </p>
          </div>
        </div>

        <div class="account_container_orders_item_invoice">
          <p>Facture numéro : {{ order.invoiceId }}</p>
        </div>
      </div>
    </div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import { decryptData } from '~/utils/crypto'
import PopupComponent from '~/components/attachable/PopupComponent.vue'

export default {
  components: {
    PopupComponent,
  },
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popupMessage: null,
      orders: [],
      ordersLoading: true,
      ordersError: '',

      currentOrderIndex: null,
    }
  },
  computed: {},
  mounted() {
    this.fetchOrders()
  },

  methods: {
    async fetchOrders(index = 0) {
      this.ordersLoading = true
      this.ordersError = ''

      try {
        const data = await $fetch('/api/account/orders', {
          query: { index },
          credentials: 'include',
        })
        const rawOrders = this.extractOrders(data)

        this.orders = await Promise.all(
          rawOrders.map((order) => this.normalizeOrder(order))
        )
      } catch (error) {
        this.orders = []
        this.ordersError = 'Impossible de récupérer vos commandes.'
        console.error('Erreur lors de la récupération des commandes :', error)
      } finally {
        this.ordersLoading = false
      }
    },
    extractOrders(data) {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.orders)) return data.orders
      if (Array.isArray(data?.member)) return data.member
      if (Array.isArray(data?.['hydra:member'])) return data['hydra:member']
      if (Array.isArray(data?.data?.orders)) return data.data.orders
      if (Array.isArray(data?.data?.member)) return data.data.member
      return []
    },
    parseCartData(cartData) {
      if (Array.isArray(cartData)) return cartData
      if (!cartData || typeof cartData !== 'string') return []

      try {
        const parsed = JSON.parse(cartData)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    },
    async parseShippingInfo(shippingInfo) {
      if (!shippingInfo) return {}
      if (typeof shippingInfo === 'object') return shippingInfo

      try {
        return await decryptData(shippingInfo)
      } catch {
        try {
          return JSON.parse(shippingInfo)
        } catch {
          return {}
        }
      }
    },
    async normalizeOrder(order) {
      const createdAtValue = order.created_at || order.createdAt
      const createdAt = new Date(createdAtValue)
      const validDate = !Number.isNaN(createdAt.getTime())

      return {
        ...order,
        id: order.id || null,
        invoiceId: order.invoiceId || order.invoice_id || order.id || '—',
        status: order.status || 'En cours',
        cartData: this.parseCartData(order.cartData || order.items),
        shippingInfo: await this.parseShippingInfo(
          order.shippingInfo || order.shipping_info || order.shipping
        ),
        created_at: {
          date: validDate ? createdAt.getDate() : '—',
          month: validDate ? createdAt.getMonth() + 1 : '—',
          year: validDate ? createdAt.getFullYear() : '—',
        },
      }
    },
    canRequestReturn(formattedDateYYYYMMDD) {
      const today = new Date()
      const delivery = new Date(formattedDateYYYYMMDD)
      const diffTime = Math.abs(today - delivery)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 20
    },
    handleCurrentOrder(index) {
      if (index === this.currentOrderIndex) {
        this.currentOrderIndex = null
      } else {
        this.currentOrderIndex = index
      }
    },
    requestClothingReturn(product, invoiceId) {
      const requestClothingReturn = {
        product: product,
        invoiceId: invoiceId,
      }
      this.$emit('request-clothing-return', requestClothingReturn)
    },
  },
}
</script>
