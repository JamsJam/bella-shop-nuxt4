<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes du visage</h2>
      </div>
      <div
        v-if="selectedSkinColor && faces.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(face, index) in faces"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedFace && face.id === selectedFace.id,
          }"
          @click="selectFace(face)"
        >
          <img :src="face.image" alt="" />
        </button>
      </div>
      <div
        v-else-if="selectedSkinColor !== null && faces.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucunes formes de visage de cette couleur</p>
        </div>
      </div>
      <div v-else class="avatar_creation_container_choices_container_item_list">
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de peau</p>
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
    selectedSkinColor: {
      type: Object,
    },
    selectedFace: {
      type: Object,
    },
    selectedAccessory: {
      type: Object,
      default: null,
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
    faces() {
      return this.avatarCatalogStore.faces
    },
    selectedAccessoryId() {
      return this.selectedAccessory ? this.selectedAccessory.id : null
    },
  },
  async mounted() {
    try {
      if (this.faces.length === 0 && this.selectedSkinColor) {
        await this.fetchFacesBySkinColorId(
          this.selectedSkinColor.id,
          this.selectedAccessoryId
        )
      }
    } catch (err) {
      console.error(err)
    }
  },

  methods: {
    async fetchFacesBySkinColorId(selectedSkinColorId, accessoryId = null) {
      try {
        await this.avatarCatalogStore.fetchFacesBySkinColorId(
          selectedSkinColorId,
          accessoryId
        )
      } catch (err) {
        throw new Error(err)
      }
    },
    selectFace(face) {
      this.$emit('select-face', face)
    },
  },
}
</script>
