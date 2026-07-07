<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes du nez</h2>
      </div>
      <div
        v-if="selectedSkinColor && noses.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(nose, index) in noses"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedNose && nose.id === selectedNose.id,
          }"
          @click="selectNose(nose)"
        >
          <img :src="nose.image" alt="" />
        </button>
      </div>
      <div
        v-else-if="selectedSkinColor && noses.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucunes formes de nez de cette couleur</p>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de peau</p>
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
    selectedSkinColor: {
      type: Object,
    },
    selectedNose: {
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
    noses() {
      return this.avatarCatalogStore.noses
    },
  },
  async mounted() {
    try {
      if (this.noses.length === 0 && this.selectedSkinColor) {
        await this.fetchNosesBySkinColorId(this.selectedSkinColor.id)
      }
    } catch (err) {
      console.error(err)
    }
  },

  methods: {
    async fetchNosesBySkinColorId(selectedSkinColorId) {
      try {
        await this.avatarCatalogStore.fetchNosesBySkinColorId(
          selectedSkinColorId
        )
      } catch (err) {
        throw new Error(err)
      }
    },
    selectNose(nose) {
      this.$emit('select-nose', nose)
    },
  },
}
</script>
