<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Accessoires</h2>
      </div>
      <div
        v-if="accessoryFaces.length > 0"
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
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="accessoriesLoading">Chargement des accessoires...</p>
          <p v-else-if="!selectedFace">
            Choisissez une forme de tête
          </p>
          <p v-else>
            {{ accessoriesError || 'Aucun accessoire disponible' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'

export default {
  props: {
    selectedFace: {
      type: Object,
    },
  },
  data() {
    return {
      accessoriesLoading: false,
      accessoriesError: '',
    }
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
  },
  async mounted() {
    if (this.selectedFace?.id) {
      await this.fetchAccessoryFaces(this.selectedFace.id)
    }
  },
  watch: {
    selectedFace: {
      async handler(face) {
        if (!face?.id) {
          this.avatarCatalogStore.accessoryFaces = []
          return
        }

        await this.fetchAccessoryFaces(face.id)
      },
    },
  },
  methods: {
    async fetchAccessoryFaces(faceId) {
      this.accessoriesLoading = true
      this.accessoriesError = ''

      try {
        await this.avatarCatalogStore.fetchAccessoryFaces(faceId)
      } catch (error) {
        this.avatarCatalogStore.accessoryFaces = []
        this.accessoriesError = 'Impossible de charger les accessoires'
        console.error(
          "Une erreur s'est produite lors de la récupération des visages avec accessoires :",
          error
        )
      } finally {
        this.accessoriesLoading = false
      }
    },
    selectAccessoryFace(face) {
      this.$emit('select-accessory-face', face)
    },
  },
}
</script>
