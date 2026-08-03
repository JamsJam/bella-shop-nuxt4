<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs des sourcils</h2>
      </div>
      <div
        v-if="eyebrowcolors.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
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
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="colorsLoading">Chargement des couleurs de sourcils...</p>
          <p v-else>Aucune couleur de sourcils disponible</p>
        </div>
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
          <p>Aucune forme de sourcils disponible pour cette couleur</p>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Veuillez sélectionner une couleur de sourcils</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'
import { normalizeAvatarColors } from '~/utils/avatarColors'

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
    return {
      colorsLoading: true,
    }
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
    await this.fetchEyebrowColors()
    if (this.selectedEyebrowColor?.id) {
      await this.fetchEyesBrowByEyebrowColorId(this.selectedEyebrowColor.id)
    }
  },

  methods: {
    async fetchEyesBrowByEyebrowColorId(eyebrowColorId) {
      this.avatarCatalogStore.eyesbrow = []
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
        const data = await $fetch('/api/avatar/eyebrow-colors')
        const colors =
          data?.colors ||
          data?.eyebrowColors ||
          data?.eyebrowcolors ||
          data?.items ||
          []

        this.avatarCatalogStore.eyebrowcolors = normalizeAvatarColors(colors)
      } catch (error) {
        this.avatarCatalogStore.eyebrowcolors = []
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs des sourcils :",
          error
        )
      } finally {
        this.colorsLoading = false
      }
    },
    selectEyeBrow(eyebrow) {
      this.$emit('select-eyebrow', eyebrow)
    },
    async selectEyebrowColor(eyebrowcolor) {
      const currentEyebrowShape = this.selectedEyebrow?.name
        ?.split('__')
        .at(-1)

      this.$emit('select-eyebrowcolor', eyebrowcolor)
      await this.fetchEyesBrowByEyebrowColorId(eyebrowcolor.id)

      const matchingEyebrow = currentEyebrowShape
        ? this.eyesbrow.find(
            (eyebrow) =>
              eyebrow.name?.split('__').at(-1) === currentEyebrowShape
          )
        : null

      this.$emit('select-eyebrow', matchingEyebrow || this.eyesbrow[0] || null)
    },
  },
}
</script>
