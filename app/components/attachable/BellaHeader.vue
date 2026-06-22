<template>
  <header class="bella_header" :class="headerClass">
    <div v-if="auth === false" class="bella_header_auth_buttons">
      <div class="bella_header_auth_buttons_connexion">
        <a href="/login">Connexion</a>
      </div>
      <div class="bella_header_auth_buttons_inscription">
        <a href="/signin">S'inscrire</a>
      </div>
    </div>

    <div v-else-if="auth === true" class="bella_header_auth_buttons">
      <div class="bella_header_auth_buttons_account">
        <a href="/account">Compte</a>
      </div>
    </div>

    <div class="bella_header_auth_buttons_cart">
      <a href="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 21 21"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 6.5h12.5l-1.586 5.55a2 2 0 0 1-1.923 1.45h-6.7a2 2 0 0 1-1.989-1.78L4.5 4.5h-2"
            />
            <g fill="currentColor" transform="translate(2 4)">
              <circle cx="5" cy="12" r="1" />
              <circle cx="13" cy="12" r="1" />
            </g>
          </g>
        </svg>
        <p v-if="cartLength !== 0">{{ cartLength }}</p>
      </a>
    </div>

    <div class="bella_header_logo">
      <img :src="headerLogoImage" alt="" />
    </div>
  </header>
</template>

<script>
import { decryptData, encryptData } from '~/utils/crypto'

export default {
  components: {},
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cartLength: 0,
    }
  },
  computed: {
    headerClass() {
      return {
        bella_header_default: !this.$route.path.includes('/product'),
        bella_header_transparent: this.$route.path.includes('/product'),
      }
    },
    headerLogoImage() {
      return this.$route.path.includes('/product')
        ? '/images/logos/bella_logo_black.png'
        : '/images/logos/bella_logo_white.png'
    },
  },
  mounted() {
    this.updateCartLength()
  },
  methods: {
    updateCartLength() {
      if (localStorage.getItem('cart')) {
        const encryptedCartData = localStorage.getItem('cart')
        const decryptedCartData = decryptData(encryptedCartData)

        this.cartLength = decryptedCartData ? decryptedCartData.length : 0
      }
    },
  },
}
</script>

<style scoped lang="scss">
// @use "../../sass/base/" as *;
// @use "../../sass/utils/" as *;

// .bella_header{
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 30;
//   width: 100%;
//   height: 9.7vh;

//   &_auth_buttons{
//     display: flex;
//     position: absolute;
//     top: 3.4vh;
//     right: 3vh;

//     a{
//       border: none;
//       border-radius: 3.2vh;
//       transition: all ease 0.3s;
//       font-size: 1.5vh;
//     }

//     &_connexion{
//       @media (max-width: 900px) {
//         display: none;
//       }
//       a{
//         background-color: transparent;
//         margin-right: 0.5vh;
//         padding: 1.6vh 3.2vh;

//         &:hover{
//           background-color: darken($color: $beige, $amount: 10);
//         }
//       }
//     }
//     &_inscription{
//       a{
//         padding: 1.6vh 3.2vh;
//         background-color: $grey;
//         &:hover{
//           background-color: darken($color: $beige, $amount: 10);
//         }
//       }
//     }

//     &_cart{
//       position: absolute;
//       left: 8vh;
//       top: 1.5vh;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       padding: 0 2.2vh;

//       @media (max-width: 900px) {
//         left: 0;
//       }

//       a{
//         position: relative;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         svg{
//           width: 3.8vh;
//           height: 3.8vh;
//           transition: all ease 0.3s;
//           padding: 1vh;
//           border: 0.1vh solid transparent;
//           border-radius: 100%;
//         }
//         p{
//           position: absolute;
//           left: 2.9vh;
//           top: 2.2vh;
//           font-size: 1vh;
//           font-weight: 600;
//         }

//         &:hover{
//           svg{
//             border: 0.1vh solid $white;
//             background-color: darken($color: $beige, $amount: 10);
//           }
//         }
//       }
//     }

//     &_account{
//       a{
//         position: relative;
//         background-color: transparent;
//         margin: 0 3.2vh;
//         padding: 1.4vh 0;

//         &:hover{
//           &::after{
//             width: 100%;
//           }
//         }

//         &::after{
//           content: "";
//           position: absolute;
//           bottom: 0.3vh;
//           right: 0;
//           width: 0;
//           height: 0.1vh;
//           transition: all ease 0.2s;
//         }

//       }

//     }
//   }

//   &_logo{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;

//     img{
//       margin-top: 0.5vh;
//       height: 60%;
//     }
//   }

// }

// .bella_header_default{
//   background-color: $beige;

//   .bella_header_auth_buttons{
//     &_connexion{
//       a{
//         color: $white;
//       }
//     }
//     &_inscription{
//       a{
//         color: $black;
//         &:hover{
//           color: $white;
//         }
//       }
//     }
//     &_cart{
//       a{
//         svg{
//           color: $white;
//         }
//         p{
//           color: $white;
//         }
//       }
//     }
//     &_account{
//       a{
//         color: $white;

//         &:hover{
//           color: $white;
//         }

//         &:after{
//           background-color: $white;
//         }
//       }
//     }
//   }
// }

// .bella_header_transparent{
//   background-color: transparent;

//   &_account{
//     a{
//       color: $black;

//       &:hover{
//         color: $black;
//       }
//     }
//   }

//   a{
//     color: $black;

//     &:hover{

//       svg{
//         color: $white;
//         border: 0.1vh solid $black;
//       }
//       p{
//         color: $white;
//       }
//     }

//     &::after{
//       background-color: $black;
//     }
//   }

//   svg{
//     color: $black;
//   }
//   p{
//     color: $black;
//   }
// }
</style>
