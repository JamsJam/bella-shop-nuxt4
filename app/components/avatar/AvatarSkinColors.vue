<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs de peau</h2>
      </div>
      <div class="avatar_creation_container_choices_container_item_list">
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
    selectedSkinColor: {
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
    skincolors() {
      return this.avatarCatalogStore.skincolors
    },
  },
  mounted() {
    if (this.skincolors.length === 0) {
      this.fetchSkinColors()
    }
  },

  methods: {
    async fetchSkinColors() {
      try {
        await this.avatarCatalogStore.fetchSkinColors()
      } catch (error) {
        //         this.avatarCatalogStore.skincolors = [
        // {
        // "id": 5,
        // "name": "Noir 1",
        // "colorValue": "#492f20"
        // },
        // {
        // "id": 6,
        // "name": "Noir 2",
        // "colorValue": "#7b5438"
        // },
        // {
        // "id": 8,
        // "name": "Marron 1",
        // "colorValue": "#a37955"
        // },
        // {
        // "id": 9,
        // "name": "Marron 2",
        // "colorValue": "#c39f7c"
        // },
        // {
        // "id": 10,
        // "name": "Blanc 1",
        // "colorValue": "#fbbd93"
        // },
        // {
        // "id": 11,
        // "name": "Blanc 2",
        // "colorValue": "#e8cdbb"
        // }
        // ]
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de peau :",
          error
        )
      }
    },
    selectSkinColor(skincolor) {
      // console.log(skincolor)
      this.$emit('select-skincolor', skincolor)
    },
  },
}
</script>
