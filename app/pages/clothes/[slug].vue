<template>
  <div class="clothes_product">
    <NavigationBar />

    <main class="clothes_product_page">
      <div class="clothes_product_page_inner">
        <NuxtLink :to="`/category/${product.category.slug}`" class="clothes_product_page_back">
          Retour
        </NuxtLink>

        <div class="clothes_product_page_layout">
          <ProductImages :images="product.images" :product-name="product.name" />

          <div class="clothes_product_page_content">
            <ProductHeader
              :name="product.name"
              :price="product.price"
              :description="product.description"
            />

            <ProductSelection
              :colors="product.colors"
              :sizes="product.sizes"
              :size-guide="product.sizeGuide"
              :selected-color="selectedColor"
              :selected-size="selectedSize"
              :quantity="quantity"
              :stock="stock"
              :stock-available="stockAvailable"
              :stock-loading="stockLoading"
              :stock-error="stockError"
              @select-color="selectColor"
              @select-size="selectSize"
              @change-quantity="changeQuantity"
              @add-to-cart="addToCart"
              @add-to-avatar="addToAvatarClothes"
            />
          </div>
        </div>

        <ProductRecommendations :clothes="product.relatedClothes" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import ProductHeader from '~/components/product/ProductHeader.vue'
import ProductImages from '~/components/product/ProductImages.vue'
import ProductSelection from '~/components/product/ProductSelection.vue'
import ProductRecommendations from '~/components/product/ProductRecommendations.vue'
import { useAvatarStore } from '~/stores/avatar'
import { useCartStore } from '~/stores/cart'
import Footer from '~/components/attachable/Footer.vue'

const route = useRoute()
const avatarStore = useAvatarStore()
const cartStore = useCartStore()

const { data } = await useFetch(() => `/api/clothes/${route.params.slug}`)

const fallbackProduct = {
  id: null,
  slug: route.params.slug,
  name: 'Produit',
  price: 0,
  description: '',
  metadescription: '',
  category: {
    name: '',
    slug: '',
  },
  images: [],
  colors: [],
  sizes: [],
  sizeGuide: {
    title: 'Guide des tailles',
    columns: [],
    rows: [],
  },
  relatedClothes: [],
}

const product = computed(() => data.value || fallbackProduct)
const selectedColor = ref(null)
const selectedSize = ref(null)
const quantity = ref(1)
const stock = ref(null)
const stockAvailable = ref(false)
const stockLoading = ref(false)
const stockError = ref('')
let stockRequestId = 0

cartStore.load()

watch(
  [product, () => route.params.slug],
  (currentProduct) => {
    const nextProduct = Array.isArray(currentProduct)
      ? currentProduct[0]
      : currentProduct

    selectedColor.value = nextProduct.colors?.find((color) => color.slug === route.params.slug)
      || nextProduct.colors?.[0]
      || null
    selectedSize.value = nextProduct.sizes?.[0] || null
  },
  { immediate: true }
)

watch(
  selectedSize,
  async (size) => {
    quantity.value = 1
    await refreshStock(size?.id)
  },
  { immediate: true }
)

function buildSelectionPayload() {
  return {
    productId: product.value.id,
    productSlug: product.value.slug,
    productName: product.value.name,
    image: product.value.images?.[0]?.src || '',
    unitPrice: product.value.price,
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value,
  }
}

function selectColor(color) {
  selectedColor.value = color
}

function selectSize(size) {
  selectedSize.value = size
}

async function refreshStock(variantId = selectedSize.value?.id) {
  const requestId = ++stockRequestId

  if (!variantId) {
    stock.value = null
    stockAvailable.value = false
    stockError.value = ''
    return false
  }

  stockLoading.value = true
  stockError.value = ''

  try {
    const response = await $fetch(`/api/variants/${variantId}/stock`)

    if (requestId !== stockRequestId) {
      return false
    }

    stock.value = Math.max(0, Number(response.stock) || 0)
    stockAvailable.value = Boolean(response.available) && stock.value > 0

    if (stockAvailable.value) {
      quantity.value = Math.min(Math.max(1, quantity.value), stock.value)
    } else {
      quantity.value = 1
    }

    return stockAvailable.value
  } catch (error) {
    if (requestId === stockRequestId) {
      stock.value = null
      stockAvailable.value = false
      stockError.value = 'Disponibilité momentanément indisponible.'
    }

    console.error('Erreur lors de la vérification du stock :', error)
    return false
  } finally {
    if (requestId === stockRequestId) {
      stockLoading.value = false
    }
  }
}

async function changeQuantity(nextQuantity) {
  const isAvailable = await refreshStock()

  if (!isAvailable || stock.value === null) {
    return
  }

  quantity.value = Math.min(
    Math.max(1, Number(nextQuantity) || 1),
    stock.value
  )
}

async function addToCart() {
  if (!selectedColor.value || !selectedSize.value) {
    return
  }

  const isAvailable = await refreshStock()

  if (!isAvailable) {
    return
  }

  cartStore.addItem(buildSelectionPayload())
}

function addToAvatarClothes() {
  if (!selectedColor.value || !selectedSize.value) {
    return
  }

  const variantId = selectedColor.value.variantId || selectedColor.value.id

  if (!variantId) {
    return
  }

  const currentIds = Array.isArray(avatarStore.clothesId) ? avatarStore.clothesId : []
  void avatarStore.setClothesId([...new Set([...currentIds, variantId])])
}
</script>
