<template>
  <div class="returns">
    <div class="returns_container">
      <div class="returns_container_title">
        <h1>FAQ</h1>
      </div>

      <div
        v-for="item in questions ?? []"
        :key="`faq-${item.question}`"
        class="returns_container_description"
      >
        <div class="returns_container_description_subtitle">
          <h2>{{ item.question }}</h2>
        </div>
        <div class="returns_container_description_paraf" v-html="item.answer"></div>
      </div>
    </div>

    <div class="footer_container"></div>
  </div>
</template>

<script setup lang="ts">
import type { FAQBlockDTO } from '#shared/dto/faq.dto.ts'

const props = defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: Array as () => FAQBlockDTO[],
    default: () => [],
  },
})

const questions = props.questions
</script>


