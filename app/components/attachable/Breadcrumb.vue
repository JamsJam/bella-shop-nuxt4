<template>
  <nav v-if="resolvedItems.length" class="breadcrumb" aria-label="Fil d'Ariane">
    <ol class="breadcrumb_list">
      <li
        v-for="(item, index) in resolvedItems"
        :key="`${item.label}_${index}`"
        class="breadcrumb_item"
      >
        <NuxtLink
          v-if="item.to && !isLastItem(index)"
          :to="item.to"
          class="breadcrumb_link"
        >
          {{ item.label }}
        </NuxtLink>

        <span v-else class="breadcrumb_current" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  BreadcrumbItemDTO,
  BreadcrumbPageDataDTO,
} from '#shared/dto/breadcrumb.dto'

const props = defineProps<{
  items?: BreadcrumbItemDTO[]
  pageData?: BreadcrumbPageDataDTO | null
}>()

const route = useRoute()
const generatedItems = useBreadcrumbItems(
  route,
  computed(() => props.pageData)
)
const resolvedItems = computed(() => props.items ?? generatedItems.value)
const jsonLd = useBreadcrumbJsonLd(resolvedItems)

const isLastItem = (index: number) =>
  index === resolvedItems.value.length - 1

useHead(() => {
  if (!jsonLd.value) {
    return {}
  }

  return {
    script: [
      {
        key: 'breadcrumb-json-ld',
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd.value),
      },
    ],
  }
})
</script>
