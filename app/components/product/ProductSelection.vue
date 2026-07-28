<template>
  <section class="product_selection" aria-label="Selection du produit">
    <div class="product_selection_group">
      <p class="product_selection_label">Couleur : {{ selectedColorName }}</p>

      <div class="product_selection_colors">
        <NuxtLink
          v-for="color in colors"
          :key="color.slug"
          :to="color.href"
          class="product_selection_color"
          :class="{ product_selection_color_active: isSelectedColor(color) }"
          :style="{ backgroundColor: color.hex }"
          :aria-label="color.name"
          @click="$emit('select-color', color)"
        ></NuxtLink>
      </div>
    </div>

    <div class="product_selection_group">
      <p class="product_selection_label">Taille : {{ selectedSizeName }}</p>

      <div class="product_selection_sizes">
        <button
          v-for="size in sizes"
          :key="size.id || size.name"
          type="button"
          class="product_selection_size"
          :class="{ product_selection_size_active: isSelectedSize(size) }"
          @click="$emit('select-size', size)"
        >
          {{ size.name || size }}
        </button>
      </div>
    </div>

    <ProductSizeGuide
      :title="sizeGuide.title"
      :columns="sizeGuide.columns"
      :rows="sizeGuide.rows"
    />

    <div v-if="selectedSize" class="product_selection_quantity">
      <p class="product_selection_label">Quantité</p>

      <div
        class="product_selection_quantity_counter"
        role="group"
        aria-label="Quantité du produit"
      >
        <button
          type="button"
          aria-label="Diminuer la quantité"
          :disabled="quantity <= 1 || stockLoading"
          @click="$emit('change-quantity', quantity - 1)"
        >
          −
        </button>
        <output aria-live="polite">{{ quantity }}</output>
        <button
          type="button"
          aria-label="Augmenter la quantité"
          :disabled="!canIncreaseQuantity"
          @click="$emit('change-quantity', quantity + 1)"
        >
          +
        </button>
      </div>

      <p
        class="product_selection_availability"
        :class="{ product_selection_availability_unavailable: !stockAvailable }"
        aria-live="polite"
      >
        {{ availabilityMessage }}
      </p>
    </div>

    <div class="product_selection_actions">
      <button
        type="button"
        class="product_selection_button button--primary"
        :disabled="!canSubmit"
        @click="$emit('add-to-cart')"
      >
        Ajouter au panier
      </button>

      <button
        type="button"
        class="product_selection_button button--secondary"
        :disabled="!canSubmit"
        @click="$emit('add-to-avatar')"
      >
        Essayer sur votre avatar
      </button>
    </div>
  </section>
</template>

<script>
import ProductSizeGuide from '~/components/product/ProductSizeGuide.vue'

export default {
  name: 'ProductSelection',
  components: {
    ProductSizeGuide,
  },
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    sizes: {
      type: Array,
      default: () => [],
    },
    selectedColor: {
      type: Object,
      default: null,
    },
    selectedSize: {
      type: [Object, String],
      default: null,
    },
    sizeGuide: {
      type: Object,
      default: () => ({
        title: 'Guide des tailles',
        columns: [],
        rows: [],
      }),
    },
    quantity: {
      type: Number,
      default: 1,
    },
    stock: {
      type: Number,
      default: null,
    },
    stockAvailable: {
      type: Boolean,
      default: false,
    },
    stockLoading: {
      type: Boolean,
      default: false,
    },
    stockError: {
      type: String,
      default: '',
    },
  },
  emits: [
    'select-color',
    'select-size',
    'change-quantity',
    'add-to-cart',
    'add-to-avatar',
  ],
  computed: {
    selectedColorName() {
      return this.selectedColor?.name || 'Aucune'
    },
    selectedSizeName() {
      return this.selectedSize?.name || this.selectedSize || 'Aucune'
    },
    canSubmit() {
      return Boolean(
        this.selectedColor &&
          this.selectedSize &&
          this.stockAvailable &&
          !this.stockLoading
      )
    },
    canIncreaseQuantity() {
      return Boolean(
        this.stockAvailable &&
          !this.stockLoading &&
          this.stock !== null &&
          this.quantity < this.stock
      )
    },
    availabilityMessage() {
      if (this.stockLoading) {
        return 'Vérification du stock…'
      }

      if (this.stockError) {
        return this.stockError
      }

      if (!this.selectedSize) {
        return 'Sélectionnez une taille pour vérifier la disponibilité.'
      }

      if (!this.stockAvailable || this.stock === 0) {
        return 'Rupture de stock.'
      }

      if (this.stock <= 5) {
        return this.stock === 1
          ? 'Plus qu’un disponible.'
          : `Plus que ${this.stock} disponibles.`
      }

      return 'En stock.'
    },
  },
  methods: {
    isSelectedColor(color) {
      return this.selectedColor?.slug === color.slug
    },
    isSelectedSize(size) {
      if (!this.selectedSize) {
        return false
      }

      const selectedValue = this.selectedSize.id || this.selectedSize.name || this.selectedSize
      const sizeValue = size.id || size.name || size
      return selectedValue === sizeValue
    },
  },
}
</script>
