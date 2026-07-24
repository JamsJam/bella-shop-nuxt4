<template>
  <div class="avatar_creation_container_choices_container">
    <div class="avatar_creation_container_choices_container_item">
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Couleurs des cheveux</h2>
      </div>
      <div
        v-if="haircolors.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
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
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="colorsLoading">Chargement des couleurs de cheveux...</p>
          <p v-else>{{ colorsError || 'Aucune couleur de cheveux disponible' }}</p>
        </div>
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
        v-else-if="selectedHairColor"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p v-if="hairsLoading">Chargement des cheveux...</p>
          <p v-else>
            {{
              hairsError ||
              'Aucune coupe de cheveux disponible pour cette couleur'
            }}
          </p>
        </div>
      </div>

      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Veuillez sélectionner une couleur de cheveux</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'
import { normalizeAvatarColors } from '~/utils/avatarColors'

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
    return {
      colorsLoading: true,
      colorsError: '',
      hairsLoading: false,
      hairsError: '',
    }
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
      if (this.selectedHairColor?.id) {
        await this.fetchHairsByHairColorId(this.selectedHairColor.id)
      }
    } catch (err) {
      console.error(err)
    }

    if (this.haircolors.length === 0) {
      await this.fetchHairColors()
    } else {
      this.colorsLoading = false
    }
  },

  methods: {
    async fetchHairsByHairColorId(selectedHairColorId) {
      this.hairsLoading = true
      this.hairsError = ''
      this.avatarCatalogStore.hairs = []

      try {
        const data = await $fetch(
          `/api/avatar/hair-colors/${selectedHairColorId}/hairs`
        )
        this.avatarCatalogStore.hairs = Array.isArray(data?.items)
          ? data.items
          : []

        if (this.hairs.length === 0) {
          this.hairsError =
            'Aucune coupe de cheveux disponible pour cette couleur'
        }
      } catch (err) {
        this.hairsError = 'Impossible de charger les cheveux'
        console.error(err)
      } finally {
        this.hairsLoading = false
      }
    },
    async fetchHairColors() {
      try {
        this.colorsError = ''
        const data = await $fetch('/api/avatar/hair-colors')
        const colors =
          data?.colors ||
          data?.hairColors ||
          data?.haircolors ||
          data?.items ||
          []

        this.avatarCatalogStore.haircolors = normalizeAvatarColors(colors)

        if (this.avatarCatalogStore.haircolors.length === 0) {
          this.colorsError = 'Aucune couleur de cheveux disponible'
        }
      } catch (error) {
        this.colorsError = 'Impossible de charger les couleurs de cheveux'
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs de cheveux :",
          error
        )
      } finally {
        this.colorsLoading = false
      }
    },
    selectHairs(hair) {
      this.$emit('select-hair', hair)
    },
    async selectHairColor(haircolor) {
      try {
        this.$emit('select-haircolor', haircolor)
        await this.fetchHairsByHairColorId(haircolor.id)

        if (this.selectedHair?.id) {
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
