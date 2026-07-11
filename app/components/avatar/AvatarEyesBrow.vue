<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs des sourcils</h2>
      </div>
      <div class="avatar_creation_container_choices_container_item_list">
        <button
          v-for="(eyebrowcolor, index) in eyebrowcolors"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_colors"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedEyebrowColor &&
              eyebrowcolor.id === selectedEyebrowColor.id,
          }"
          @click="selectEyebrowColor(eyebrowcolor)"
        >
          <div
            class="avatar_creation_container_choices_container_item_list_element_color"
            :style="{ backgroundColor: eyebrowcolor.colorValue }"
          ></div>
        </button>
      </div>

      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes des sourcils</h2>
      </div>
      <div
        v-if="selectedEyebrowColor && eyesbrow.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(eyebrow, index) in eyesbrow"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedEyebrow && eyebrow.id === selectedEyebrow.id,
          }"
          @click="selectEyeBrow(eyebrow)"
        >
          <img :src="eyebrow.image" alt="" />
        </button>
      </div>
      <div
        v-else-if="selectedEyebrowColor && eyesbrow.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucunes formes de sourcils de cette couleur</p>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de sourcils</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'

export default {
  components: {
  },
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
    selectedEyebrow: {
      type: Object,
    },
    selectedEyebrowColor: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    eyesbrow() {
      return this.avatarCatalogStore.eyesbrow
    },
    eyebrowcolors() {
      return this.avatarCatalogStore.eyebrowcolors
    },
  },
  async mounted() {
    if (this.eyebrowcolors.length === 0) {
      await this.fetchEyebrowColors()
    }
    if (this.eyesbrow.length === 0 && this.selectedEyebrowColor) {
      await this.fetchEyesBrowByEyebrowColorId(this.selectedEyebrowColor.id)
    }
  },

  methods: {
    async fetchEyesBrowByEyebrowColorId(eyebrowColorId) {
      try {
        await this.avatarCatalogStore.fetchEyesBrowByEyebrowColorId(
          eyebrowColorId
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des formes des sourcils :",
          error
        )
      }
    },
    async fetchEyebrowColors() {
      try {
        await this.avatarCatalogStore.fetchEyebrowColors()
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs des sourcils :",
          error
        )
      }
    },
    selectEyeBrow(eyebrow) {
      this.$emit('select-eyebrow', eyebrow)
    },
    async selectEyebrowColor(eyebrowcolor) {
      this.$emit('select-eyebrowcolor', eyebrowcolor)
      await this.fetchEyesBrowByEyebrowColorId(eyebrowcolor.id)

      if (this.selectedEyebrow && this.selectedEyebrow.id) {
        const currentEyebrow = this.selectedEyebrow
        const foundEyebrow = this.eyesbrow.find(
          (el) =>
            el.eyebrowcolor_id === eyebrowcolor.id &&
            el.eyebrow_variant === currentEyebrow.eyebrow_variant
        )

        if (foundEyebrow) {
          this.$emit('select-eyebrow', foundEyebrow)
        }
      }
    },
  },
}
</script>
