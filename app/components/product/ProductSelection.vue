<template>
  <section class="product_selection" aria-label="Selection du produit">
    <div class="product_selection_group">
      <p class="product_selection_label">Couleur : {{ selectedColorName }}</p>

      <div class="product_selection_colors">
        <button
          v-for="color in colors"
          :key="color.id"
          type="button"
          class="product_selection_color"
          :class="{ product_selection_color_active: isSelectedColor(color) }"
          :style="{ backgroundColor: color.hex }"
          :aria-label="color.name"
          @click="$emit('select-color', color)"
        ></button>
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
  },
  emits: ['select-color', 'select-size', 'add-to-cart', 'add-to-avatar'],
  computed: {
    selectedColorName() {
      return this.selectedColor?.name || 'Aucune'
    },
    selectedSizeName() {
      return this.selectedSize?.name || this.selectedSize || 'Aucune'
    },
    canSubmit() {
      return Boolean(this.selectedColor && this.selectedSize)
    },
  },
  methods: {
    isSelectedColor(color) {
      return this.selectedColor?.id === color.id
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
