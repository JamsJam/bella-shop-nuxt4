<template>
  <div class="avatar_creation_container_choices_container">
    <div
      class="avatar_creation_container_choices_container_item"
      :class="{
        avatar_creation_container_choices_container_item_disabled: !skincolor,
      }"
    >
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Morphologies</h2>
      </div>

      <div
        v-if="!skincolor"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une couleur de peau pour choisir votre morphologie !</p>
        </div>
      </div>

      <div
        v-if="skincolor && morphologies.length > 0"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(morphology, index) in morphologies"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_morphology_choice"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedMorphology && morphology.id === selectedMorphology.id,
          }"
          @click="selectMorphology(morphology)"
        >
          <img
            v-if="morphologyImage(morphology)"
            :src="morphologyImage(morphology)"
            :alt="morphology.name || 'Morphologie'"
          />
          <div
            class="avatar_creation_container_choices_container_item_list_element_name"
          >
            <p>{{ morphology.name }}</p>
          </div>
        </button>
      </div>

      <div
        v-else-if="skincolor"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucune morphologie disponible pour cette couleur de peau</p>
        </div>
      </div>
    </div>

    <div
      v-if="skincolor"
      class="avatar_creation_container_choices_container_item"
    >
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Morphotypes</h2>
      </div>

      <div
        v-if="selectedMorphology && morphotypes.length > 0 && skincolor"
        class="avatar_creation_container_choices_container_item_list"
      >
        <button
          v-for="(morphotype, index) in morphotypes"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_element avatar_morphology_choice"
          :class="{
            avatar_creation_container_choices_container_item_list_element_selected:
              selectedMorphotype && morphotype.id === selectedMorphotype.id,
          }"
          @click="selectMorphotype(morphotype)"
        >
          <img
            v-if="morphotypeImage(morphotype)"
            :src="morphotypeImage(morphotype)"
            :alt="morphotype.size || 'Morphotype'"
            @error="useUnclothedMorphotypeImage($event, morphotype)"
          />
          <div
            class="avatar_creation_container_choices_container_item_list_element_name"
          >
            <p>{{ morphotype.size }}</p>
          </div>
        </button>
      </div>

      <div
        v-else-if="selectedMorphology && morphotypes.length === 0"
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Aucun morphotype correspondant à cette morphologie</p>
        </div>
      </div>

      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Choisissez une morphologie</p>
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
    skincolor: {
      type: Object,
    },
    selectedMorphology: {
      type: Object,
    },
    selectedMorphotype: {
      type: Object,
    },
    clothingSlug: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      clothingBodies: [],
    }
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    morphologies() {
      return this.avatarCatalogStore.morphologies
    },
    morphotypes() {
      if (!this.selectedMorphology) return []

      const sizeOrder = { S: 0, M: 1, L: 2 }

      return [...this.avatarCatalogStore.morphotypes].sort(
        (first, second) =>
          (sizeOrder[String(first.size).toUpperCase()] ?? 99) -
          (sizeOrder[String(second.size).toUpperCase()] ?? 99)
      )
    },
  },
  watch: {
    skincolor() {
      this.fetchMorphologies()
    },
    clothingSlug: {
      async handler() {
        await this.fetchClothingBodies()
      },
      immediate: true,
    },
  },
  async mounted() {
    if (this.skincolor?.id) {
      await this.fetchMorphologies()
    }
    const selectedMorphologyIsAvailable = this.morphologies.some(
      (morphology) => morphology.id === this.selectedMorphology?.id
    )

    if (selectedMorphologyIsAvailable) {
      this.fetchMorphotypesBySkinColorAndMorphology()
    } else {
      const fallbackMorphology = this.morphologies[0]

      if (fallbackMorphology) {
        await this.selectMorphology(fallbackMorphology)
      }
    }
  },

  methods: {
    async fetchClothingBodies() {
      if (!this.clothingSlug) {
        this.clothingBodies = []
        return
      }

      try {
        this.clothingBodies = [
          ...(await this.avatarCatalogStore.fetchBodiesByClothingSlug(
            this.clothingSlug
          )),
        ]
      } catch (error) {
        this.clothingBodies = []
        console.error(error)
      }
    },
    morphologyImage(morphology) {
      if (!this.clothingSlug) return morphology.image

      const body = this.clothingBodies.find(
        (item) =>
          Number(item.skinColorId) === Number(this.skincolor?.id) &&
          Number(item.morphologyId) === Number(morphology.id) &&
          (!this.selectedMorphotype?.id ||
            Number(item.morphotypeId) ===
              Number(this.selectedMorphotype.id))
      )

      return body?.image || morphology.image
    },
    morphotypeImage(morphotype) {
      if (!this.clothingSlug) return morphotype.image

      const body = this.clothingBodies.find(
        (item) =>
          Number(item.skinColorId) === Number(this.skincolor?.id) &&
          Number(item.morphologyId) ===
            Number(this.selectedMorphology?.id) &&
          Number(item.morphotypeId) === Number(morphotype.id)
      )

      return body?.image || morphotype.image
    },
    useUnclothedMorphotypeImage(event, morphotype) {
      const image = event.currentTarget

      if (!(image instanceof HTMLImageElement) || !morphotype?.image) return
      if (image.src === morphotype.image) return

      image.src = morphotype.image
    },
    async fetchMorphologies() {
      this.avatarCatalogStore.morphologies = []
      this.avatarCatalogStore.morphotypes = []

      if (!this.skincolor?.id) return

      try {
        await this.avatarCatalogStore.fetchMorphologiesBySkinColorId(
          this.skincolor.id
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des morphologies :",
          error
        )
      }
    },
    async fetchMorphotypesBySkinColorAndMorphology() {
      if (!this.skincolor?.id || !this.selectedMorphology?.id) return

      try {
        await this.avatarCatalogStore.fetchMorphotypesBySkinColorAndMorphology(
          this.skincolor.id,
          this.selectedMorphology.id
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des morphotypes :",
          error
        )
      }
    },
    async selectMorphology(morphology) {
      await this.avatarCatalogStore.fetchMorphotypesBySkinColorAndMorphology(
        this.skincolor.id,
        morphology.id
      )
      this.$emit('select-morphology', morphology)
    },
    selectMorphotype(morphotype) {
      this.$emit('select-morphotype', morphotype)
    },
  },
}
</script>

<style scoped>
.avatar_morphology_choice {
  flex-direction: column;
  gap: 0.25rem;
  width: 6rem;
  height: auto;
}

.avatar_morphology_choice img {
  flex: 0 0 auto;
  width: 5rem;
  height: 5rem;
  object-fit: contain;
}

.avatar_morphology_choice p {
  margin: 0;
  text-align: center;
}
</style>
