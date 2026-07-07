<template>
  <div v-if="hasRows" class="product_size_guide">
    <button
      type="button"
      class="product_size_guide_link"
      :aria-expanded="isOpen"
      aria-controls="product_size_guide_modal"
      @click="openModal"
    >
      Guide des tailles
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="product_size_guide_overlay"
        @click.self="closeModal"
      >
        <section
          id="product_size_guide_modal"
          ref="modal"
          class="product_size_guide_modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product_size_guide_title"
          tabindex="-1"
          @keydown.esc="closeModal"
        >
          <div class="product_size_guide_modal_header">
            <h2 id="product_size_guide_title">{{ title }}</h2>

            <button
              type="button"
              class="product_size_guide_close"
              aria-label="Fermer le guide des tailles"
              @click="closeModal"
            >
              ×
            </button>
          </div>

          <div class="product_size_guide_table_wrapper">
            <table class="product_size_guide_table">
              <thead>
                <tr>
                  <th
                    v-for="column in columns"
                    :key="column.key"
                    scope="col"
                  >
                    {{ column.label }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in rows" :key="row.size">
                  <td
                    v-for="column in columns"
                    :key="`${row.size}_${column.key}`"
                  >
                    {{ row[column.key] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'ProductSizeGuide',
  props: {
    title: {
      type: String,
      default: 'Guide des tailles',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    hasRows() {
      return this.columns.length > 0 && this.rows.length > 0
    },
  },
  methods: {
    openModal() {
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.modal?.focus()
      })
    },
    closeModal() {
      this.isOpen = false
    },
  },
}
</script>
