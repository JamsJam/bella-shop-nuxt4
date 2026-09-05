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
      <button type="button" class="button--secondary" @click="$emit('retry-orders')">
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
      <details
        v-for="(order, index) in orders"
        :key="order.id || order.invoiceId || index"
        class="account_container_orders_item"
      >
        <summary class="account_container_orders_item_summary">
          <span class="account_container_orders_item_summary_identity">
            <strong>Commande n°{{ order.invoiceId }}</strong>
            <time :datetime="order.createdAt">{{ order.displayDate }}</time>
          </span>
          <span class="account_container_orders_item_summary_status">
            {{ order.shippingStatusLabel }}
          </span>
          <span
            class="account_container_orders_item_summary_chevron"
            aria-hidden="true"
          >
            ›
          </span>
        </summary>

        <div class="account_container_orders_item_details">
          <div class="account_container_orders_item_cart">
            <div
              v-for="(product, productIndex) in order.cartData"
              :key="product.id || product.productId || productIndex"
              class="account_container_orders_item_cart_product"
            >
              <div class="account_container_orders_item_cart_product_title">
                <p>{{ product.name }}</p>
                <p v-if="product.color || product.size">
                  {{ product.color?.name || 'Couleur non renseignée' }} /
                  {{ product.size?.name || 'Taille non renseignée' }}
                </p>
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
            <a
              v-if="order.invoiceUrl"
              :href="order.invoiceUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir ma facture
            </a>
          </div>
        </div>
      </details>
    </div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import PopupComponent from '~/components/attachable/PopupComponent.vue'

export default {
  components: {
    PopupComponent,
  },
  props: {
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
      popupMessage: null,
      orders: [],
    }
  },
  created() {
    this.applyOrders(this.initialOrders)
  },
  watch: {
    initialOrders: {
      handler(orders) {
        this.applyOrders(orders)
      },
      deep: true,
    },
  },

  methods: {
    applyOrders(orders) {
      this.orders = this.extractOrders(orders)
        .filter((order) => this.isPaidOrder(order))
        .map((order) => this.normalizeOrder(order))
        .sort(
          (first, second) => second.createdAtTimestamp - first.createdAtTimestamp
        )
    },
    extractOrders(data) {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.orders)) return data.orders
      if (Array.isArray(data?.member)) return data.member
      if (Array.isArray(data?.['hydra:member'])) return data['hydra:member']
      if (Array.isArray(data?.data?.orders)) return data.data.orders
      if (Array.isArray(data?.data?.member)) return data.data.member
      if (Array.isArray(data?.data?.['hydra:member'])) {
        return data.data['hydra:member']
      }
      return []
    },
    isPaidOrder(order) {
      const status =
        order?.paymentStatus ??
        order?.payment_status ??
        order?.status ??
        order?.orderStatus?.value

      return status == null || String(status).toLowerCase() === 'paid'
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
    parseShippingInfo(shippingInfo) {
      if (!shippingInfo) return {}
      if (typeof shippingInfo === 'object') return shippingInfo

      try {
        return JSON.parse(shippingInfo)
      } catch {
        return {}
      }
    },
    normalizeOrder(order) {
      const createdAtValue = order.created_at || order.createdAt
      const createdAt = new Date(createdAtValue)
      const validDate = !Number.isNaN(createdAt.getTime())

      return {
        ...order,
        id: order.id || null,
        invoiceId:
          order.reference ||
          order.invoiceId ||
          order.invoice_id ||
          order.id ||
          '—',
        invoiceUrl:
          order.invoiceUrl || order.invoiceURL || order.invoice_url || '',
        status: order.status || 'En cours',
        cartData: this.normalizeCartItems(
          this.parseCartData(order.cartData || order.items)
        ),
        shippingInfo: this.parseShippingInfo(
          order.shippingInfo || order.shipping_info || order.shipping
        ),
        createdAt: validDate ? createdAt.toISOString() : '',
        displayDate: validDate
          ? new Intl.DateTimeFormat('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(createdAt)
          : 'Date non renseignée',
        shippingStatusLabel: this.humanizeShippingStatus(order),
        createdAtTimestamp: validDate ? createdAt.getTime() : 0,
        created_at: {
          date: validDate ? createdAt.getDate() : '—',
          month: validDate ? createdAt.getMonth() + 1 : '—',
          year: validDate ? createdAt.getFullYear() : '—',
        },
      }
    },
    normalizeCartItems(items) {
      return items.map((item) => ({
        ...item,
        id: item.id || item.productId,
        price:
          item.unitPriceTTC != null
            ? (Number(item.unitPriceTTC) / 100).toFixed(2)
            : item.price,
        subTotal:
          item.totalTTC != null
            ? (Number(item.totalTTC) / 100).toFixed(2)
            : item.subTotal,
      }))
    },
    humanizeShippingStatus(order) {
      const rawStatus =
        order.shippingStatus ||
        order.shipping_status ||
        order.deliveryStatus ||
        order.delivery_status ||
        order.shippingInfo?.shippingStatus ||
        order.shippingInfo?.shipping_status ||
        order.shippingInfo?.status ||
        order.orderStatus?.label ||
        order.orderStatus?.value

      if (!rawStatus || String(rawStatus).toLowerCase() === 'paid') {
        return 'En préparation'
      }

      const normalized = String(rawStatus)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .trim()
        .toLowerCase()
      const labels = {
        created: 'Commande enregistrée',
        pending: 'En attente',
        preparing: 'En préparation',
        processing: 'En préparation',
        ready: 'Prête à être expédiée',
        shipped: 'Expédiée',
        'in transit': 'En cours de livraison',
        delivered: 'Livrée',
        cancelled: 'Annulée',
        returned: 'Retournée',
      }

      return labels[normalized] ||
        normalized.charAt(0).toUpperCase() + normalized.slice(1)
    },
    canRequestReturn(formattedDateYYYYMMDD) {
      const today = new Date()
      const delivery = new Date(formattedDateYYYYMMDD)
      const diffTime = Math.abs(today - delivery)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 20
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
