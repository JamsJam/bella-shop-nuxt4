<template>
  <div class="cart_page">
    <NavigationBar />
    <AttachableBreadcrumb />

    <main class="cart_page_container">
      <div class="cart_page_header">
        <NuxtLink to="/category" class="back_link cart_page_back">
          Retour aux catégories
        </NuxtLink>
        <h1>Panier</h1>
      </div>

      <div v-if="cartItems.length > 0" class="cart_page_content">
        <section class="cart_page_items" aria-label="Articles du panier">
          <article
            v-for="item in cartItems"
            :key="item.id"
            class="cart_page_item"
            :class="{
              cart_page_item_unavailable: isItemUnavailable(item),
            }"
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
              <p
                class="cart_page_item_stock"
                :class="{
                  cart_page_item_stock_error: isItemUnavailable(item),
                }"
                aria-live="polite"
              >
                {{ getStockMessage(item) }}
              </p>
            </div>

            <div class="cart_page_item_quantity">
              <button
                type="button"
                aria-label="Retirer une quantite"
                :disabled="isStockLoading(item)"
                @click="changeItemQuantity(item, -1)"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                aria-label="Ajouter une quantite"
                :class="{
                  cart_page_item_quantity_max: isMaximumReached(item),
                }"
                :disabled="
                  isStockLoading(item) ||
                  !isItemAvailable(item) ||
                  item.quantity >= getItemStock(item)
                "
                @click="changeItemQuantity(item, 1)"
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

          <NuxtLink
            v-if="canCheckout"
            to="/expedition"
            class="button--primary cart_page_checkout"
          >
            Commander
          </NuxtLink>
          <button
            v-else
            type="button"
            class="button--primary cart_page_checkout"
            disabled
          >
            Stock indisponible
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
import { computed, ref } from 'vue'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const requestFetch = useRequestFetch()
const stockByItem = ref({})

cartStore.load()

const cartItems = computed(() => cartStore.items)
const canCheckout = computed(
  () =>
    cartItems.value.length > 0 &&
    cartItems.value.every(
      (item) =>
        isItemAvailable(item) &&
        !isStockLoading(item) &&
        item.quantity <= getItemStock(item)
    )
)

await Promise.all(cartItems.value.map((item) => refreshItemStock(item)))

function getVariantId(item) {
  const variantId = Number(item.size?.id || item.variantId)
  return Number.isInteger(variantId) && variantId > 0 ? variantId : null
}

function getStockState(item) {
  return stockByItem.value[item.id] || {
    stock: 0,
    available: false,
    loading: true,
    checked: false,
    error: '',
  }
}

function getItemStock(item) {
  return getStockState(item).stock
}

function isStockLoading(item) {
  return getStockState(item).loading
}

function isItemAvailable(item) {
  const state = getStockState(item)
  return (
    !state.loading &&
    !state.error &&
    state.available &&
    item.quantity <= state.stock
  )
}

function isItemUnavailable(item) {
  const state = getStockState(item)

  return (
    state.checked &&
    Boolean(
      state.error ||
        !state.available ||
        state.stock === 0 ||
        item.quantity > state.stock
    )
  )
}

function isMaximumReached(item) {
  const state = getStockState(item)

  return (
    state.checked &&
    !state.error &&
    state.available &&
    item.quantity >= state.stock
  )
}

function getStockMessage(item) {
  const state = getStockState(item)

  if (state.loading) {
    return 'Vérification du stock…'
  }

  if (state.error) {
    return state.error
  }

  if (!state.available || state.stock === 0) {
    return 'Rupture de stock.'
  }

  if (item.quantity > state.stock) {
    return `Stock insuffisant : ${state.stock} disponible${state.stock > 1 ? 's' : ''}.`
  }

  if (state.stock <= 5) {
    return `Plus que ${state.stock} disponible${state.stock > 1 ? 's' : ''}.`
  }

  return 'En stock.'
}

async function refreshItemStock(item) {
  const variantId = getVariantId(item)

  if (!variantId) {
    stockByItem.value = {
      ...stockByItem.value,
      [item.id]: {
        stock: 0,
        available: false,
        loading: false,
        checked: true,
        error: 'Impossible de vérifier le stock de cette taille.',
      },
    }
    return false
  }

  stockByItem.value = {
    ...stockByItem.value,
    [item.id]: {
      ...getStockState(item),
      loading: true,
      error: '',
    },
  }

  try {
    const response = await requestFetch(`/api/variants/${variantId}/stock`)
    const stock = Math.max(0, Number(response.stock) || 0)
    const available = Boolean(response.available) && stock > 0

    stockByItem.value = {
      ...stockByItem.value,
      [item.id]: {
        stock,
        available,
        loading: false,
        checked: true,
        error: '',
      },
    }

    return available && item.quantity <= stock
  } catch (error) {
    stockByItem.value = {
      ...stockByItem.value,
      [item.id]: {
        stock: 0,
        available: false,
        loading: false,
        checked: true,
        error: 'Disponibilité momentanément indisponible.',
      },
    }

    console.error('Erreur lors de la vérification du stock :', error)
    return false
  }
}

async function changeItemQuantity(item, delta) {
  await refreshItemStock(item)

  if (delta < 0) {
    cartStore.decrementItem(item.id)
    return
  }

  if (isItemAvailable(item) && item.quantity < getItemStock(item)) {
    cartStore.incrementItem(item.id)
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>
