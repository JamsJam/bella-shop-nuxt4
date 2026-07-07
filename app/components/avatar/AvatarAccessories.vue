<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Accessoires</h2>
      </div>
      <div
        v-if="canFetchAccessoryFaces && accessoryFaces.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(face, index) in accessoryFaces"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedFace && selectedFace.id === face.id,
          }"
          @click="selectAccessoryFace(face)"
        >
          <img :src="face.image" alt="" />
        </button>
      </div>
      <div
        v-else-if="canFetchAccessoryFaces"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucun accessoir disponible</p>
        </div>
      </div>
      <div v-else class="avatar_creation_container_choices_container_item_list">
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de peau et une forme de visage</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'

export default {
  props: {
    selectedSkinColor: {
      type: Object,
    },
    selectedFace: {
      type: Object,
    },
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    accessoryFaces() {
      return this.avatarCatalogStore.accessoryFaces
    },
    canFetchAccessoryFaces() {
      return (
        this.selectedSkinColor &&
        this.selectedSkinColor.id &&
        this.selectedFace &&
        this.selectedFace.face_variant
      )
    },
  },
  async mounted() {
    if (this.canFetchAccessoryFaces) {
      await this.fetchAccessoryFacesBySkinColorId(
        this.selectedSkinColor.id,
        this.selectedFace.face_variant
      )
    }
  },
  methods: {
    async fetchAccessoryFacesBySkinColorId(skincolorId, faceVariant) {
      try {
        await this.avatarCatalogStore.fetchAccessoryFacesBySkinColorId(
          skincolorId,
          faceVariant
        )
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des visages avec accessoires :",
          error
        )
      }
    },
    selectAccessoryFace(face) {
      this.$emit('select-accessory-face', face)
    },
  },
}
</script>
