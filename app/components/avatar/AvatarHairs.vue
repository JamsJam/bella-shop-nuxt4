<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs des cheveux</h2>
      </div>
      <div class="avatar_creation_container_choices_container_item_list">
        <button
          v-for="(haircolor, index) in haircolors"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_colors"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedHairColor && haircolor.id === selectedHairColor.id,
          }"
          @click="selectHairColor(haircolor)"
        >
          <div
            class="avatar_creation_container_choices_container_item_list_element_color"
            :style="{ backgroundColor: haircolor.colorValue }"
          ></div>
        </button>
      </div>
    </div>

    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Formes des cheveux</h2>
      </div>

      <div
        v-if="selectedHairColor && hairs.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(hair, index) in hairs"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_creation_container_choices_container_item_list_element_images hairs"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedHair && hair.id === selectedHair.id,
          }"
          @click="selectHairs(hair)"
        >
          <img v-if="hair.frontImage" :src="hair.frontImage" alt="" />
          <img v-if="hair.backImage" :src="hair.backImage" alt="" />
        </button>
      </div>

      <div
        v-else-if="selectedHairColor && hairs.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucunes formes de cheveux de cette couleur</p>
        </div>
      </div>

      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de cheveux</p>
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
    selectedHair: {
      type: Object,
    },
    selectedHairColor: {
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
    hairs() {
      return this.avatarCatalogStore.hairs
    },
    haircolors() {
      return this.avatarCatalogStore.haircolors
    },
  },
  async mounted() {
    try {
      if (this.hairs.length === 0 && this.selectedHairColor) {
        await this.fetchHairsByHairColorId(this.selectedHairColor.id)
      }
    } catch (err) {
      console.error(err)
    }

    if (this.haircolors.length === 0) {
      this.fetchHairColors()
    }
  },

  methods: {
    async fetchHairsByHairColorId(selectedHairColorId) {
      try {
        await this.avatarCatalogStore.fetchHairsByHairColorId(
          selectedHairColorId
        )
      } catch (err) {
        throw new Error(err)
      }
    },
    async fetchHairColors() {
      try {
        await this.avatarCatalogStore.fetchHairColors()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de cheveux :",
          error
        )
      }
    },
    selectHairs(hair) {
      this.$emit('select-hair', hair)
    },
    async selectHairColor(haircolor) {
      try {
        this.$emit('select-haircolor', haircolor)
        await this.fetchHairsByHairColorId(haircolor.id)

        if (this.selectedHair.id) {
          const currentHair = this.selectedHair
          const foundHair = this.hairs.find(
            (el) =>
              el.haircolor_id === haircolor.id &&
              el.hair_variant === currentHair.hair_variant
          )

          if (foundHair) {
            this.$emit('select-hair', foundHair)
          } else {
            throw new Error(
              "La forme des cheveux de cette couleur n'existe pas"
            )
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
