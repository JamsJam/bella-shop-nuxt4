<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs de la bouche</h2>
      </div>
      <div
        v-if="mouthcolors.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(mouthcolor, index) in mouthcolors"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_colors"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedMouthColor && mouthcolor.id === selectedMouthColor.id,
          }"
          @click="selectMouthColor(mouthcolor)"
        >
          <div
            class="avatar_creation_container_choices_container_item_list_element_color"
            :style="{ backgroundColor: mouthcolor.colorValue }"
          ></div>
        </button>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="colorsLoading">Chargement des couleurs de bouche...</p>
          <p v-else>{{ colorsError || 'Aucune couleur de bouche disponible' }}</p>
        </div>
      </div>

      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes de la bouche</h2>
      </div>
      <div
        v-if="selectedMouthColor && mouthes.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(mouth, index) in mouthes"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedMouth && mouth.id === selectedMouth.id,
          }"
          @click="selectMouth(mouth)"
        >
          <img :src="mouth.image" alt="" />
        </button>
      </div>
      <div
        v-else-if="selectedMouthColor && mouthes.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucune forme de bouche disponible pour cette couleur</p>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Veuillez sélectionner une couleur de bouche</p>
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
    selectedMouth: {
      type: Object,
    },
    selectedMouthColor: {
      type: Object,
    },
  },
  data() {
    return {
      colorsLoading: true,
      colorsError: '',
    }
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    mouthes() {
      return this.avatarCatalogStore.mouthes
    },
    mouthcolors() {
      return this.avatarCatalogStore.mouthcolors
    },
  },
  async mounted() {
    if (this.mouthcolors.length === 0) {
      await this.fetchMouthColors()
    } else {
      this.colorsLoading = false
    }
    if (this.selectedMouthColor?.id) {
      await this.fetchMouthesByMouthColorId(this.selectedMouthColor.id)
    }
  },

  methods: {
    async fetchMouthesByMouthColorId(mouthColorId) {
      this.avatarCatalogStore.mouthes = []
      try {
        const data = await $fetch(
          `/api/avatar/mouth-colors/${mouthColorId}/mouths`
        )
        this.avatarCatalogStore.mouthes = Array.isArray(data?.items)
          ? data.items
          : []
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des formes de bouche :",
          error
        )
      }
    },
    async fetchMouthColors() {
      try {
        this.colorsError = ''
        const data = await $fetch('/api/avatar/mouth-colors')
        const colors = Array.isArray(data?.colors) ? data.colors : []

        this.avatarCatalogStore.mouthcolors = normalizeAvatarColors(colors)

        if (this.avatarCatalogStore.mouthcolors.length === 0) {
          this.colorsError = 'Aucune couleur de bouche disponible'
        }
      } catch (error) {
        this.colorsError = 'Impossible de charger les couleurs de bouche'
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de bouche :",
          error
        )
      } finally {
        this.colorsLoading = false
      }
    },
    selectMouth(mouth) {
      this.$emit('select-mouth', mouth)
    },
    async selectMouthColor(mouthcolor) {
      this.$emit('select-mouthcolor', mouthcolor)
      await this.fetchMouthesByMouthColorId(mouthcolor.id)

      if (this.selectedMouth && this.selectedMouth.id) {
        const currentMouth = this.selectedMouth
        const foundMouth = this.mouthes.find(
          (mouth) => mouth.name === currentMouth.name
        )

        this.$emit('select-mouth', foundMouth || this.mouthes[0] || null)
      }
    },
  },
}
</script>
