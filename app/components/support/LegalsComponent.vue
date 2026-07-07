<template>
  <div class="legals">
    <div class="legals_container">
      <div class="legals_container_title">
        <h2>Mentions légales</h2>
      </div>

      <div
        v-for="item in legals?.LegalMentions ?? []"
        :key="`legal-${item.title}`"
        class="legals_container_description"
      >
        <div class="legals_container_description_subtitle">
          <h3>{{ item.title }}</h3>
        </div>
        <div class="legals_container_description_paraf" v-html="item.content"></div>
      </div>

      <div class="legals_container_title">
        <h2>CGV</h2>
      </div>

      <div
        v-for="item in legals?.cgv ?? []"
        :key="`cgv-${item.title}`"
        class="legals_container_description"
      >
        <div class="legals_container_description_subtitle">
          <h3>{{ item.title }}</h3>
        </div>
        <div class="legals_container_description_paraf" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LegalsDTO } from '#shared/dto/legals.dto.ts'
import type { PropType } from 'vue'

const props = defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
  legals: {
    type: Object as PropType<LegalsDTO | null>,
    default: null,
  },
})
</script>

