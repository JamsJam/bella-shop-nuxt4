<template>
  <div class="returns">
    <div class="returns_container">
      <div class="returns_container_title">
        <h1>Faire un retour</h1>
      </div>
      <div class="returns_container_description">
        <div
          v-for="(block, index) in blocks ?? []"
          :key="`returns-block-${index}`"
          class="returns_container_description_paraf"
        >
          <div v-if="block.title" class="returns_container_description_title">
            <h3>{{ block.title }}</h3>
          </div>
          <div v-html="block.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { StaticBlockDTO } from '#shared/dto/staticPage.dto.ts'

export default {
  components: {},
  props: {
    blocks: {
      type: Array as () => StaticBlockDTO[],
      default: () => [],
    },
  },
}
</script>
