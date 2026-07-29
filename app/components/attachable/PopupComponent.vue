<template>
  <Teleport to="body">
    <div
      v-if="popup_message && displayPopup"
      class="popup"
      :class="`popup_${popup_message.type}`"
      :role="popup_message.type === 'error' ? 'alert' : 'status'"
      aria-live="polite"
    >
      <p>{{ displayedMessage }}</p>
      <button
        type="button"
        class="popup_icon"
        aria-label="Fermer le message"
        @click="closePopup"
      >
        <svg
          v-if="popup_message.type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 21"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15.5 15.5l-10-10zm0-10l-10 10"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 21"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m5.5 11.5l3 3l8.028-8"
          />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<script>
import { humanizeErrorMessage } from '~/utils/humanizeErrorMessage'

export default {
  components: {},
  props: {
    popup_message: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      displayPopup: false,
      popupTimeout: null,
    }
  },
  computed: {
    displayedMessage() {
      if (this.popup_message?.type === 'error') {
        return humanizeErrorMessage(this.popup_message?.message)
      }

      return typeof this.popup_message?.message === 'string'
        ? this.popup_message.message
        : 'L’action a bien été effectuée.'
    },
  },
  watch: {
    popup_message: {
      immediate: true,
      handler(newPopup) {
        if (!newPopup) return

        this.displayPopup = true
        this.clearPopupTimeout()
        this.popupTimeout = setTimeout(this.closePopup, 5000)
      },
    },
  },
  beforeUnmount() {
    this.clearPopupTimeout()
  },
  methods: {
    clearPopupTimeout() {
      if (this.popupTimeout) {
        clearTimeout(this.popupTimeout)
        this.popupTimeout = null
      }
    },
    closePopup() {
      this.displayPopup = false
      this.clearPopupTimeout()
    },
  },
}
</script>

<style
  scoped
  lang="scss"
  src="../../../assets/styles/components/_popup.scss"
></style>
