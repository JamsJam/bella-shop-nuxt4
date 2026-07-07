<template>
  <nav class="breadscrum" aria-label="Fil d'Ariane">
    <ol class="breadscrum_list">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}_${index}`"
        class="breadscrum_item"
      >
        <NuxtLink
          v-if="item.to && !isLastItem(index)"
          :to="item.to"
          class="breadscrum_link"
        >
          {{ item.label }}
        </NuxtLink>

        <span v-else class="breadscrum_current" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadscrum',
  props: {
    items: {
      type: Array,
      required: true,
      validator(items) {
        return items.every((item) => item && item.label)
      },
    },
  },
  methods: {
    isLastItem(index) {
      return index === this.items.length - 1
    },
  },
}
</script>
