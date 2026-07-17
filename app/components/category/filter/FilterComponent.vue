<template>
  <div
    class="category_container_box_filter_container_type"
    :class="{ 'is-open': isOpen }"
  >
    <button type="button" :aria-expanded="isOpen" @click="isOpen = !isOpen">
      <p>{{ label }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 21 21"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.5 8.5l-4 4l-4-4"
        />
      </svg>
    </button>
    <div
      v-if="label === 'Prix'"
      class="category_container_box_filter_container_type_box"
    >
      <div class="category_container_box_filter_container_type_box_item">
        <div
          class="category_container_box_filter_container_type_box_item_price"
        >
          <label class="price-range-label">Prix Min:</label>
          <input type="number" v-model.number="localMinPrice" :min="0" />
          <p>€</p>
        </div>
        <div
          class="category_container_box_filter_container_type_box_item_price"
        >
          <label class="price-range-label">Prix Max:</label>
          <input type="number" v-model.number="localMaxPrice" :min="0" />
          <p>€</p>
        </div>
      </div>
    </div>
    <div v-else class="category_container_box_filter_container_type_box">
      <div
        v-for="(filter, index) in filterItems"
        :key="index"
        class="category_container_box_filter_container_type_box_item"
      >
        <label v-if="label !== 'Promotions'" class="checkbox-container">
          {{ filterLabel(filter) }}
          <input type="checkbox" v-model="selectedFilters" :value="filterValue(filter)" />
          <div
            class="checkbox-custom"
            :class="{ checked: selectedFilters.includes(filterValue(filter)) }"
          ></div>
        </label>
        <label v-if="label === 'Promotions'" class="checkbox-container">
          {{ filter.name }} %
          <input
            type="checkbox"
            v-model="selectedFilters"
            :value="filter.name"
          />
          <div
            class="checkbox-custom"
            :class="{ checked: selectedFilters.includes(filter.name) }"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    label: String,
    filterItems: Array,
  },
  data() {
    return {
      selectedFilters: [],
      localMinPrice: 0,
      localMaxPrice: null,
      isOpen: false,
    }
  },
  watch: {
    selectedFilters() {
      this.$emit('filter-change', {
        label: this.label,
        values: this.selectedFilters,
      })
    },
    localMinPrice() {
      this.$emit('filter-change', {
        label: this.label,
        values: { minPrice: this.localMinPrice, maxPrice: this.localMaxPrice },
      })
    },
    localMaxPrice() {
      this.$emit('filter-change', {
        label: this.label,
        values: { minPrice: this.localMinPrice, maxPrice: this.localMaxPrice },
      })
    },
  },
  mounted() {},
  methods: {
    filterLabel(filter) {
      return typeof filter === 'string' ? filter : filter.name
    },
    filterValue(filter) {
      return typeof filter === 'string' ? filter : filter.id
    },
  },
}
</script>
