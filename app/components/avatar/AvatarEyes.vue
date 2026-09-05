<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item">
        <div class="avatar_creation_container_choices_container_item_title">
          <h2>Couleurs des yeux</h2>
        </div>

        <div
          v-if="eyecolors.length > 0"
          class="avatar_creation_container_choices_container_item_list"
        >
          <button
            v-for="(eyecolor, index) in eyecolors"
            :key="index"
            class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_colors"
            :class="{
              avatar_creation_container_choices_container_item_list_element_selected:
                selectedEyesColor && eyecolor.id === selectedEyesColor.id,
            }"
            @click="selectEyeColor(eyecolor)"
          >
            <div
              class="avatar_creation_container_choices_container_item_list_element_color"
              :style="{ backgroundColor: eyecolor.colorValue }"
            ></div>
          </button>
        </div>
        <div
          v-else
          class="avatar_creation_container_choices_container_item_list empty"
        >
          <div class="avatar_creation_container_choices_container_item_list_text">
            <p v-if="colorsLoading">Chargement des couleurs des yeux...</p>
            <p v-else>{{ colorsError || 'Aucune couleur des yeux disponible' }}</p>
          </div>
        </div>
      </div>

      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes des yeux</h2>
      </div>

      <div
        v-if="selectedEyesColor && eyes.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(eye, index) in eyes"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_images"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedEyes && eye.id === selectedEyes.id,
          }"
          @click="selectEye(eye)"
        >
          <img :src="eye.image" alt="" />
        </button>
      </div>

      <div
        v-else-if="selectedEyesColor && eyes.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucune forme d'yeux disponible pour cette couleur</p>
        </div>
      </div>

      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Veuillez sélectionner une couleur des yeux</p>
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
    selectedEyes: {
      type: Object,
    },
    selectedEyesColor: {
      type: Object,
    },
  },
  data() {
    return {
      colorsLoading: true,
      colorsError: '',
      eyesLoading: false,
    }
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    eyes() {
      return this.avatarCatalogStore.eyes
    },
    eyecolors() {
      return this.avatarCatalogStore.eyecolors
    },
  },
  async mounted() {
    try {
      if (this.selectedEyesColor?.id) {
        await this.fetchEyesByEyesColorId(this.selectedEyesColor.id)
      }
    } catch (err) {
      console.error(err)
    }
    if (this.eyecolors.length === 0) {
      await this.fetchEyeColors()
    } else {
      this.colorsLoading = false
    }
  },

  methods: {
    async fetchEyesByEyesColorId(selectedEyesColorId) {
      this.eyesLoading = true
      this.avatarCatalogStore.eyes = []
      try {
        await this.avatarCatalogStore.fetchEyesByEyeColorId(
          selectedEyesColorId
        )
      } catch (err) {
        console.error(err)
      } finally {
        this.eyesLoading = false
      }
    },
    async fetchEyeColors() {
      try {
        this.colorsError = ''
        const data = await $fetch('/api/avatar/eye-colors')
        const colors = Array.isArray(data?.colors) ? data.colors : []

        this.avatarCatalogStore.eyecolors = normalizeAvatarColors(colors)

        if (this.avatarCatalogStore.eyecolors.length === 0) {
          this.colorsError = 'Aucune couleur des yeux disponible'
        }
      } catch (error) {
        this.colorsError = 'Impossible de charger les couleurs des yeux'
        console.error(
          "Une erreur s'est produite lors de la récupération de la couleur des yeux :",
          error
        )
      } finally {
        this.colorsLoading = false
      }
    },
    selectEye(eye) {
      this.$emit('select-eye', eye)
    },
    async selectEyeColor(eyecolor) {
      try {
        const currentEyeShape = this.selectedEyes?.name?.split('__').at(-1)

        this.$emit('select-eyecolor', eyecolor)
        await this.fetchEyesByEyesColorId(eyecolor.id)

        const matchingEyes = currentEyeShape
          ? this.eyes.find(
              (eye) => eye.name?.split('__').at(-1) === currentEyeShape
            )
          : null

        this.$emit('select-eye', matchingEyes || this.eyes[0] || null)
      } catch (err) {
        this.$emit('select-eye', null)
        console.error(err)
      }
    },
  },
}
</script>
