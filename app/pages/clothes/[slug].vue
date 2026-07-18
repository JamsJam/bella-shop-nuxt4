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
              @select-color="selectColor"
              @select-size="selectSize"
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

cartStore.load()

watch(
  product,
  (currentProduct) => {
    selectedColor.value = currentProduct.colors?.find((color) => color.slug === route.params.slug)
      || currentProduct.colors?.[0]
      || null
    selectedSize.value = currentProduct.sizes?.[0] || null
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
  }
}

function selectColor(color) {
  selectedColor.value = color
}

function selectSize(size) {
  selectedSize.value = size
}

function addToCart() {
  if (!selectedColor.value || !selectedSize.value) {
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
