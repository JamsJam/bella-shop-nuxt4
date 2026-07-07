<template>
  <div class="avatar_creation_container_choices_container">
    <div
      v-if="morphotype === null"
      class="avatar_creation_container_choices_container_item_instruction empty"
    >
      <div
        class="avatar_creation_container_choices_container_item_instruction_text"
      >
        <p>Choisissez un morphotype pour essayer votre vêtement !</p>
      </div>
    </div>
    <div
      class="avatar_creation_container_choices_container_item"
      :class="{
        avatar_creation_container_choices_container_item_disabled:
          morphotype === null,
      }"
    >
      <div class="avatar_creation_container_choices_container_item_title">
        <h2>Vêtements enregistrés</h2>
      </div>
      <div
        v-if="clothes.length > 0"
        class="avatar_creation_container_choices_container_item_list clothes"
      >
        <div
          v-for="(clothing, index) in clothes"
          :key="index"
          class="avatar_creation_container_choices_container_item_list_box"
        >
          <button
            class="avatar_creation_container_choices_container_item_list_element"
            @click="selectClothing(clothing)"
          >
            <img :src="clothing.preview_image" alt="" />
            <div
              class="avatar_creation_container_choices_container_item_list_element_name"
            >
              <p>{{ clothing.name }}</p>
            </div>
          </button>
          <button
            class="avatar_creation_container_choices_container_item_list_delete_clothing"
            @click="deleteAvatarClothing(clothing)"
          >
            Supprimer
          </button>
        </div>
      </div>
      <div
        v-else
        class="avatar_creation_container_choices_container_item_list empty"
      >
        <div class="avatar_creation_container_choices_container_item_list_text">
          <p>Ajouter des vêtements à essayer</p>
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
    clothesId: {
      type: Array,
      return: [],
    },
    morphotype: {
      type: Object,
    },
  },
  data() {
    return {
      selectedClothing: null,
      localClothes: [],
    }
  },
  setup() {
    return {
      avatarCatalogStore: useAvatarCatalogStore(),
    }
  },
  computed: {
    clothes() {
      return this.localClothes
    },
  },
  mounted() {
    if (this.clothesId.length > 0) {
      this.fetchAvatarClothes()
    }
  },

  methods: {
    async fetchAvatarClothes() {
      try {
        this.localClothes = await this.avatarCatalogStore.fetchClothesByIds(
          this.clothesId
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des vêtements :",
          error
        )
      }
    },
    selectClothing(clothing) {
      this.selectedClothing = clothing
      this.$emit('select-clothing', clothing)
    },
    deleteAvatarClothing(clothing) {
      this.$emit('delete-avatar-clothing', clothing)
      // this.selectedClothing = null;
      this.localClothes = this.localClothes.filter(
        (el) => el.id !== clothing.id
      )
      console.log(this.localClothes)
    },
  },
}
</script>
