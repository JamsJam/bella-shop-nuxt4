<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs de peau</h2>
      </div>
      <div
        v-if="skincolors.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(skincolor, index) in skincolors"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedSkinColor && skincolor.id === selectedSkinColor.id,
          }"
          @click="selectSkinColor(skincolor)"
        >
          <div
            class="avatar_creation_container_choices_container_item_list_element_color"
            :style="{ backgroundColor: skincolor.colorValue }"
          ></div>
        </button>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="skinColorsLoading">Chargement des couleurs de peau...</p>
          <p v-else>
            {{ skinColorsError || 'Aucune couleur de peau disponible' }}
          </p>
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
  },
  data() {
    return {
      skinColorsLoading: true,
      skinColorsError: '',
    }
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    skincolors() {
      return this.avatarCatalogStore.skincolors
    },
  },
  async mounted() {
    await this.fetchSkinColors()
  },

  methods: {
    async fetchSkinColors() {
      this.skinColorsLoading = true
      this.skinColorsError = ''

      try {
        const data = await $fetch('/api/avatar/skin-colors')
        this.avatarCatalogStore.hydrateSkinColors(data?.skinColors)

        if (this.skincolors.length === 0) {
          this.skinColorsError = 'Aucune couleur de peau disponible'
        }
      } catch (error) {
        this.avatarCatalogStore.skincolors = []
        this.skinColorsError = 'Impossible de charger les couleurs de peau'
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de peau :",
          error
        )
      } finally {
        this.skinColorsLoading = false
      }
    },
    selectSkinColor(skincolor) {
      // console.log(skincolor)
      this.$emit('select-skincolor', skincolor)
    },
  },
}
</script>
