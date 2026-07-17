<template>
  <div ref="filterMenu_2" class="category_container_box_filter_container_type">
    <button @click="toggleFilterMenu(2)">
      <p>{{ label }}</p>
      <svg
        ref="filterMenuIcon_2"
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
    toggleFilterMenu(menuIndex) {
      const thisFilterMenu = this.$refs['filterMenu_' + menuIndex]
      const thisFilterMenuIcon = this.$refs['filterMenuIcon_' + menuIndex]
      if (thisFilterMenu) {
        if (thisFilterMenu.style.maxHeight === '100%') {
          thisFilterMenuIcon.style.transform = 'rotateZ(360deg)'
          thisFilterMenu.style.maxHeight = '4.3vh'
        } else {
          thisFilterMenuIcon.style.transform = 'rotateZ(180deg)'
          thisFilterMenu.style.maxHeight = '100%'
        }
      }
    },
  },
}
</script>
