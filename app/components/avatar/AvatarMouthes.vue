<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs de la bouche</h2>
      </div>
      <div class="avatar_creation_container_choices_container_item_list">
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
          <p>Aucunes formes de bouche de cette couleur</p>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de bouche</p>
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
    selectedMouth: {
      type: Object,
    },
    selectedMouthColor: {
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
    }
    if (this.mouthes.length === 0 && this.selectedMouthColor) {
      await this.fetchMouthesByMouthColorId(this.selectedMouthColor.id)
    }
  },

  methods: {
    async fetchMouthesByMouthColorId(mouthColorId) {
      try {
        await this.avatarCatalogStore.fetchMouthesByMouthColorId(mouthColorId)
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
        await this.avatarCatalogStore.fetchMouthColors()
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de bouche :",
          error
        )
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
          (el) =>
            el.mouthcolor_id === mouthcolor.id &&
            el.mouth_variant === currentMouth.mouth_variant
        )

        if (foundMouth) {
          this.$emit('select-mouth', foundMouth)
        }
      }
    },
  },
}
</script>
