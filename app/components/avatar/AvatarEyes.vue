<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item">
        <div class="avatar_creation_container_choices_container_item_title">
          <h2>Couleurs des yeux</h2>
        </div>

        <div class="avatar_creation_container_choices_container_item_list">
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
          <p>Aucunes formes des yeux de cette couleur</p>
        </div>
      </div>

      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur des yeux</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BellaHeader from '~/components/attachable/BellaHeader.vue';
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'

export default {
  components: {
    // BellaHeader,
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
    return {}
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
      if (this.eyes.length === 0 && this.selectedEyesColor) {
        await this.fetchEyesByEyesColorId(this.selectedEyesColor.id)
      }
    } catch (err) {
      console.error(err)
    }
    if (this.eyecolors.length === 0) {
      this.fetchEyeColors()
    }
  },

  methods: {
    async fetchEyesByEyesColorId(selectedEyesColorId) {
      try {
        await this.avatarCatalogStore.fetchEyesByEyeColorId(
          selectedEyesColorId
        )
      } catch (err) {
        throw new Error(err)
      }
    },
    async fetchEyeColors() {
      try {
        await this.avatarCatalogStore.fetchEyeColors()
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération de la couleur des yeux :",
          error
        )
      }
    },
    selectEye(eye) {
      this.$emit('select-eye', eye)
    },
    async selectEyeColor(eyecolor) {
      this.$emit('select-eyecolor', eyecolor)
      await this.fetchEyesByEyesColorId(eyecolor.id)

      try {
        this.$emit('select-eyecolor', eyecolor)
        await this.fetchEyesByEyesColorId(eyecolor.id)

        if (this.selectedEyes.id) {
          const currentEyes = this.selectedEyes
          const foundEyes = this.eyes.find(
            (el) =>
              el.eyecolor.id === eyecolor.id &&
              el.eye_variant === currentEyes.eye_variant
          )

          if (foundEyes) {
            this.$emit('select-eye', foundEyes)
          } else {
            throw new Error("La forme des yeux de cette couleur n'existe pas")
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
