<template>
  <div class="legals">
    <div class="legals_container">
      <div class="legals_container_title">
        <h2>Politique de confidentialité</h2>
      </div>

      <div
        v-for="(block, index) in blocks ?? []"
        :key="`confidentiality-${index}`"
        class="legals_container_description"
      >
        <div v-if="block.title" class="legals_container_description_subtitle">
          <h3>{{ block.title }}</h3>
        </div>
        <div class="legals_container_description_paraf" v-html="block.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { StaticBlockDTO } from '#shared/dto/staticPage.dto.ts'

const props = defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
  blocks: {
    type: Array as () => StaticBlockDTO[],
    default: () => [],
  },
})
</script>
