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
        v-if="clothingSlug && body"
        class="avatar_creation_container_choices_container_item_list clothes"
      >
        <div
          class="avatar_creation_container_choices_container_item_list_box"
        >
          <div class="avatar_creation_container_choices_container_item_list_element">
            <img :src="body.image" alt="" />
            <div
              class="avatar_creation_container_choices_container_item_list_element_name"
            >
              <p>{{ clothingSlug }}</p>
            </div>
          </div>
          <button
            class="avatar_creation_container_choices_container_item_list_delete_clothing"
            @click="$emit('remove-clothing')"
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
export default {
  emits: ['remove-clothing'],
  props: {
    body: {
      type: Object,
      default: null,
    },
    clothingSlug: {
      type: String,
      default: null,
    },
    morphotype: {
      type: Object,
    },
  },
}
</script>
