<template>
  <div class="popup">
    <div
      v-if="popup_message && popup_message.type === 'error' && displayPopup"
      class="popup_error"
    >
      <p>{{ popup_message.message }}</p>
      <div class="popup_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
      </div>
    </div>

    <div
      v-if="popup_message && popup_message.type === 'valid' && displayPopup"
      class="popup_valid"
    >
      <p>{{ popup_message.message }}</p>
      <div class="popup_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {},
  watch: {
    popup_message(newPopup) {
      if (newPopup) {
        this.displayPopup = true
        // Si un timeout est déjà en cours, le clear
        if (this.popupTimeout) {
          clearTimeout(this.popupTimeout)
        }
        // Lance un nouveau timeout et stocke son ID
        this.popupTimeout = setTimeout(() => {
          this.displayPopup = false
        }, 5000)
      }
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">


// .popup {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   z-index: 35;
//   top: 5.4vh;
//   right: 5.4vh;
//   width: fit-content;
//   height: fit-content;
//   background-color: $white;
//   box-shadow: 0.5vh 0.5vh 1vh darken($color: $white, $amount: 30);

//   &_error {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 2.2vh 3.2vh;
//     p {
//       color: $red;
//     }
//     svg {
//       color: $red;
//     }
//   }

//   &_valid {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 2.2vh 3.2vh;
//     p {
//       color: $green;
//     }
//     svg {
//       color: $green;
//     }
//   }

//   p {
//     display: flex;
//     font-size: 1.5vh;
//     font-weight: 500;
//     margin-right: 2.2vh;
//   }

//   &_icon {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     svg {
//       width: 2.7vh;
//       height: 2.7vh;
//     }
//   }
// }
</style>
