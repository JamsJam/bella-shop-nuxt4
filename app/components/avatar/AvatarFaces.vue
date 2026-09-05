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
        v-else-if="selectedSkinColor"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="facesLoading">Chargement des visages...</p>
          <p v-else>
            {{ facesError || 'Aucune forme de visage pour cette couleur' }}
          </p>
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
    return {
      facesLoading: false,
      facesError: '',
    }
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
  },
  async mounted() {
    if (this.selectedSkinColor?.id) {
      await this.fetchFacesBySkinColorId(this.selectedSkinColor.id)
    }
  },

  methods: {
    async fetchFacesBySkinColorId(selectedSkinColorId) {
      this.facesLoading = true
      this.facesError = ''

      try {
        await this.avatarCatalogStore.fetchFacesBySkinColorId(
          selectedSkinColorId
        )
      } catch (err) {
        this.avatarCatalogStore.faces = []
        this.facesError = 'Impossible de charger les visages'
        console.error(err)
      } finally {
        this.facesLoading = false
      }
    },
    selectFace(face) {
      this.$emit('select-face', face)
    },
  },
}
</script>
