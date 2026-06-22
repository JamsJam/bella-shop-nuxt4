<template>
  <div class="manual">
    <h2>Mode d'emploi</h2>

    <div class="manual_container">
      <div
        v-for="(item, index) in sectionList"
        :key="`manual-step-${index}`"
        class="manual_container_item"
      >
        <div class="manual_container_item_step">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="manual_container_item_image">
          <img
            :src="item.image"
            :alt="`illustration étape ${index + 1}`"
          />
        </div>
        <div class="manual_container_item_title">
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>

    <a href="/avatar" class="button--primary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
        <path
          d="M4.1665 9.5H15.8332M15.8332 9.5L10.8332 4.75M15.8332 9.5L10.8332 14.25"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Créer ton avatar
    </a>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { HomepageManualDTO } from '#shared/dto/homepage.dto'

const defaultSteps = [
  {
    text: 'Inscris-toi',
    image: '/images/homepage/manual/step1.png',
  },
  {
    text: 'Crée ton avatar',
    image: '/images/homepage/manual/step2.png',
  },
  {
    text: 'Shop ta tenue',
    image: '/images/homepage/manual/step3.png',
  },
  {
    text: 'Essaie-la',
    image: '/images/homepage/manual/step4.png',
  },
  {
    text: 'Choisis ton mode de paiement',
    image: '/images/homepage/manual/step5.png',
  },
]

export default {
  components: {},
  props: {
    section: {
      type: Object as PropType<HomepageManualDTO | null>,
      default: null,
    },
  },
  computed: {
    sectionList() {
      return this.section?.list && this.section.list.length
        ? this.section.list
        : defaultSteps
    },
  },
}
</script>
