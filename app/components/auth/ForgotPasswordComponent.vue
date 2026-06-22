<template>
  <div class="forgot_password">
    <div v-if="!awaitingConfirmAccount" class="forgot_password_container">
      <div class="forgot_password_container_title">
        <h2>Mot de passe oublié</h2>
      </div>
      <div class="forgot_password_container_object">
        <input
          type="mail"
          v-model="userEmail"
          placeholder="Votre email"
          required
        />
      </div>
      <div class="forgot_password_container_object">
        <input
          type="password"
          v-model="userNewPassword"
          placeholder="Nouveau mot de passe"
          required
        />
      </div>
      <div class="forgot_password_container_object">
        <input
          type="password"
          v-model="userRepeatNewPassword"
          placeholder="Répéter votre nouveau mot de passe"
          required
        />
      </div>
      <div class="forgot_password_container_button">
        <button @click="waitingUpdatePassword()">
          Modifier votre mot de passe
        </button>
      </div>
    </div>

    <div v-if="awaitingConfirmAccount" class="forgot_password_container">
      <div class="forgot_password_code_title">
        <h3>
          Confirmer la modification de votre mot de passe avec le code envoyé à
          votre adresse mail
        </h3>
        <p>{{ userEmail }}</p>
      </div>
      <div class="forgot_password_code_inputs">
        <input
          ref="codeInput1"
          type="text"
          maxlength="1"
          v-model="code[0]"
          @input="focusNextInput($event, 1)"
        />
        <input
          ref="codeInput2"
          type="text"
          maxlength="1"
          v-model="code[1]"
          @input="focusNextInput($event, 2)"
        />
        <input
          ref="codeInput3"
          type="text"
          maxlength="1"
          v-model="code[2]"
          @input="focusNextInput($event, 3)"
        />
        <input
          ref="codeInput4"
          type="text"
          maxlength="1"
          v-model="code[3]"
          @input="focusNextInput($event, 4)"
        />
        <input
          ref="codeInput5"
          type="text"
          maxlength="1"
          v-model="code[4]"
          @input="focusNextInput($event, 5)"
        />
        <input
          ref="codeInput6"
          type="text"
          maxlength="1"
          v-model="code[5]"
          @input="focusNextInput($event, 6)"
        />
      </div>
      <div class="forgot_password_code_send_new_code">
        <button @click="waitingUpdatePassword()">
          Renvoyer un code de confirmation
        </button>
      </div>
      <div class="forgot_password_container_button">
        <button @click="handleConfirmCode()">Confirmer</button>
      </div>
    </div>

    <div class="footer_container"></div>

    <!-- <PopupComponent :popup_message="popupMessage" /> -->
  </div>
</template>

<script>
// import BellaHeader from '~/components/attachable/BellaHeader.vue';
// import PopupComponent from '~/components/attachable/PopupComponent.vue'

import inputValidations from '~/utils/inputValidations'

export default {
  components: {
    // BellaHeader,
    // PopupComponent,
  },
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userEmail: '',
      userNewPassword: '',
      userRepeatNewPassword: '',
      awaitingConfirmAccount: false,
      code: ['', '', '', '', '', ''],
      userId: null,

      resendCodeTimeout: false,

      popupMessage: null,
    }
  },
  computed: {},
  // mounted() {},

  methods: {
    validateUserEmail(input) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error("L'adresse e-mail ne peut pas être vide.")
      }

      if (!inputValidations.validateEmail(input)) {
        throw new Error("L'adresse e-mail n'est pas valide.")
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          "L'addresse e-mail contient des mots-clés SQL. Veuillez saisir une adresse valide."
        )
      }
    },

    validatePassword(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le mot de passe ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le mot de passe doit être compris entre ${8} et ${100} caractères.`
        )
      }

      if (!inputValidations.validatePassword(input)) {
        throw new Error(
          "Le mot de passe n'est pas valide, il doit avoir au moins, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial."
        )
      }
    },

    validateRepeatPassword(input, password) {
      if (input !== password) {
        throw new Error('Répéter le même nouveau mot de passe.')
      }
    },

    async waitingUpdatePassword() {
      try {
        if (this.resendCodeTimeout) {
          throw new Error('Reessayer dans quelques secondes')
        }

        this.validateUserEmail(this.userEmail)
        this.validatePassword(this.userNewPassword, 8, 100)
        this.validateRepeatPassword(
          this.userRepeatNewPassword,
          this.userNewPassword
        )

        const response = await fetch(
          `${this.$store.state.apiUrl}/auth/waiting-new-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: this.userEmail,
            }),
          }
        )

        const data = await response.json()

        if (!response.ok) {
          this.resendCodeTimeout = true
          setTimeout(() => {
            this.resendCodeTimeout = false
          }, 10000)
          throw new data.error()
        }

        if (response.ok) {
          this.userId = data.userId
          this.awaitingConfirmAccount = true
          this.popupMessage = {
            type: 'valid',
            message: data.message,
          }
          this.resendCodeTimeout = true
          setTimeout(() => {
            this.resendCodeTimeout = false
          }, 10000)
        }

        // Vous pouvez également ajouter ici des actions supplémentaires après l'envoi réussi, comme afficher un message de confirmation.
      } catch (error) {
        console.error('Erreur:', error.message)
        this.popupMessage = {
          type: 'error',
          message: error.message,
        }
        // Vous pouvez ajouter ici la logique pour gérer les erreurs lors de l'envoi du message.
      }
    },

    focusNextInput(event, index) {
      if (
        this.$refs[`codeInput${index + 1}`] &&
        event.target.value.length === 1
      ) {
        this.$refs[`codeInput${index + 1}`].focus()
      }
    },

    async handleConfirmCode() {
      const code = this.code.join('')

      const requestData = {
        code: code.toUpperCase(),
        userId: this.userId,
        newPassword: this.userNewPassword,
      }

      const url = `${this.$store.state.apiUrl}/auth/verify-confirmation-code-reset-password`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          this.popupMessage = {
            type: 'valid',
            message: data.message,
          }

          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        } else {
          // Gérer les erreurs
          throw data.error
        }

        return data
      } catch (error) {
        console.error('Erreur lors de la confirmation du code :', error)
        this.popupMessage = {
          type: 'error',
          message: error,
        }
      }
    },
  },
}
</script>

<!-- <style scoped lang="scss">
// @import '../../sass/utils/variables';
// @import '../../sass/base/base';

.forgot_password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: $grey;

  &_container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: calc(100vh - 9.7vh);
    width: 30%;
    font-family: 'Montserrat';

    @media (max-width: 1100px) {
      width: 60%;
    }

    @media (max-width: 600px) {
      width: 80%;
    }

    &_title {
      margin-bottom: 5vh;
      h2 {
        font-size: 3vh;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
        color: darken($color: $white, $amount: 30);
      }

      @media (max-width: 900px) {
        margin-top: 10vh;
      }
    }
    &_object {
      margin-top: 3vh;
      width: 100%;
      input {
        background-color: white;
        border: 0.1vh solid darken($color: $white, $amount: 10);
        padding: 1.6vh 2.2vh;
        font-family: 'Montserrat';
        width: calc(100% - 4.3vh);
        border-radius: 0.5vh;
        outline: none;
        box-shadow: 0 0.5vh 1vh darken($color: $white, $amount: 20);
        font-size: 1.5vh;
      }
    }
    &_message {
      margin-top: 3.2vh;
      width: 100%;
      textarea {
        resize: none;
        font-family: 'Montserrat';
        width: calc(100% - 4.3vh);
        border: 0.1vh solid darken($color: $white, $amount: 10);
        border-radius: 0.5vh;
        padding: 2.2vh;
        background-color: white;
        outline: none;
        box-shadow: 0 0.5vh 1vh darken($color: $white, $amount: 20);
        font-size: 1.5vh;
        height: 21.7vh;
        overflow: scroll;
      }
    }
    &_button {
      margin-top: 5.4vh;
      button {
        padding: 1.6vh 2.2vh;
        background-color: $beige;
        font-size: 1.7vh;
        border: none;
        box-shadow: 0 0.5vh 1vh darken($color: $white, $amount: 20);
        color: $white;
        width: 100%;
        transition: all ease 0.3s;

        &:hover {
          background-color: darken($color: $beige, $amount: 10);
        }
      }
    }
  }

  &_code {
    &_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-size: 3.2vh;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        max-width: 76.1vh;
      }
      p {
        margin-top: 1vh;
        font-size: 1.7vh;
        font-weight: 300;
        text-align: center;
      }
    }
    &_inputs {
      display: flex;
      justify-content: center;
      margin-top: 6.5vh;
      input {
        font-size: 2.2vh;
        font-weight: 500;
        font-family: 'Montserrat';
        color: $black;
        text-transform: uppercase;
        text-align: center;
        background-color: $white;
        border: 0.3vh solid transparent;
        border-radius: 0.5vh;
        outline: none;
        width: fit-content;
        width: 2.3vh;
        padding: 2.2vh;
        margin: 2.2vh;
        transition: all ease 0.3s;

        &:focus {
          border: 0.2vh solid darken($color: $white, $amount: 50);
        }
      }
    }
    &_send_new_code {
      margin-top: 5vh;
      display: flex;
      justify-content: center;

      button {
        background-color: transparent;
        border: none;
        outline: none;
        position: relative;
        z-index: 16;
        font-size: 1.4vh;
        color: lighten($color: $black, $amount: 50);
        transition: all ease 0.3s;

        &:visited {
          color: lighten($color: $black, $amount: 50);
        }
        &:hover {
          color: $black;

          &::after {
            width: 0;
          }
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -0.5vh;
          right: 0;
          width: 100%;
          height: 0.1vh;
          background-color: lighten($color: $black, $amount: 70);
          transition: all ease 0.3s;
        }
      }
    }
  }

  .navbar_area {
    width: 6.5vh;
    height: 100%;

    @media (max-width: 900) {
      height: 0;
      width: 0;
    }
  }

  .footer_container {
    width: 100%;
    height: 21.7vh;
  }
}
</style> -->
