<template>
  <div class="cart_page">
    <NavigationBar :auth="auth" />

    <main class="cart_page_container">
      <div class="cart_page_header">
        <NuxtLink to="/category" class="cart_page_back">Retour</NuxtLink>
        <h1>Panier</h1>
      </div>

      <div v-if="cartItems.length > 0" class="cart_page_content">
        <section class="cart_page_items" aria-label="Articles du panier">
          <article
            v-for="item in cartItems"
            :key="item.id"
            class="cart_page_item"
          >
            <NuxtLink
              :to="`/clothes/${item.productSlug}`"
              class="cart_page_item_image"
            >
              <img :src="item.image" :alt="item.productName" />
            </NuxtLink>

            <div class="cart_page_item_infos">
              <NuxtLink
                :to="`/clothes/${item.productSlug}`"
                class="cart_page_item_title"
              >
                {{ item.productName }}
              </NuxtLink>
              <p>{{ item.color?.name || 'Couleur non selectionnee' }}</p>
              <p>Taille {{ item.size?.name || item.size }}</p>
            </div>

            <div class="cart_page_item_quantity">
              <button
                type="button"
                aria-label="Retirer une quantite"
                @click="cartStore.decrementItem(item.id)"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                aria-label="Ajouter une quantite"
                @click="cartStore.incrementItem(item.id)"
              >
                +
              </button>
            </div>

            <p class="cart_page_item_price">
              {{ formatPrice(item.unitPrice * item.quantity) }}
            </p>

            <button
              type="button"
              class="cart_page_item_remove"
              @click="cartStore.removeItem(item.id)"
            >
              Supprimer
            </button>
          </article>
        </section>

        <aside class="cart_page_summary" aria-label="Resume du panier">
          <div>
            <p>Total articles</p>
            <strong>{{ cartStore.totalItems }}</strong>
          </div>

          <div>
            <p>Sous-total</p>
            <strong>{{ formatPrice(cartStore.subtotal) }}</strong>
          </div>

          <button type="button" class="button--primary cart_page_checkout">
            Commander
          </button>

          <button
            type="button"
            class="cart_page_clear"
            @click="cartStore.clear()"
          >
            Vider le panier
          </button>
        </aside>
      </div>

      <section v-else class="cart_page_empty">
        <h2>Votre panier est vide</h2>
        <NuxtLink to="/category" class="button--primary">
          Voir les vêtements
        </NuxtLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import { useCartStore } from '~/stores/cart'
import { verifyLogin } from '~/utils/auth'

const cartStore = useCartStore()
const config = useRuntimeConfig()
const auth = ref(false)

cartStore.load()

const cartItems = computed(() => cartStore.items)

onMounted(async () => {
  try {
    const apiUrl = config.public.platformApiBase || config.platformApiBase
    auth.value = await verifyLogin(apiUrl)
  } catch (error) {
    auth.value = false
  }
})

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>
