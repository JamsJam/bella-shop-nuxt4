<template>
  <div class="account_container_orders_page">
    <div class="account_container_title">
      <h1>Vos commandes</h1>
      <p>Retrouvez vos dernières commandes</p>
    </div>

    <div class="account_container_orders">
      <div
        v-for="(order, index) in orders"
        :key="index"
        class="account_container_orders_item"
        :class="{ current_orders_item: currentOrderIndex === index }"
        @click="handleCurrentOrder(index)"
      >
        <div class="account_container_orders_item_title">
          <h4>Commande n*{{ order.invoiceId }}</h4>
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
              {{ order.shippingInfo.deliveryDate.formattedDate }}</strong
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
              <p>{{ product.color.name + ' / ' + product.size.name }}</p>
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
            <p>{{ order.shippingInfo.fullAddress.display_name }}</p>
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
      orders: null,

      currentOrderIndex: null,
    }
  },
  computed: {},
  mounted() {
    this.fetchOrders()
  },

  methods: {
    fetchOrders(index = 0) {
      fetch(`/api/account/orders?index=${index}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La réponse du serveur n'est pas valide")
          }
          return response.json()
        })
        .then(async (data) => {
          // Gérer les données de la réponse

          this.orders = await Promise.all(data.orders.map(async (order) => {
            // Décrypter shippingInfo et invoiceId de chaque commande
            const decryptedShippingInfo = await decryptData(order.shippingInfo)

            // Extraire la date, le mois et l'année à partir de created_at
            const createdAt = new Date(order.created_at)
            const date = createdAt.getDate()
            const month = createdAt.getMonth() + 1 // Les mois commencent à partir de 0, donc ajouter 1
            const year = createdAt.getFullYear()

            return {
              ...order,
              cartData: JSON.parse(order.cartData),
              shippingInfo: decryptedShippingInfo,
              invoiceId: order.invoiceId,
              created_at: {
                date,
                month,
                year,
              },
            }
          }))
        })
        .catch((error) => {
          // Gérer les erreurs
          console.error('Erreur lors de la récupération des commandes :', error)
        })
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

