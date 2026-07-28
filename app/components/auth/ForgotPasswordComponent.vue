<template>
  <div class="forgot_password">
    <div v-if="!awaitingConfirmAccount" class="forgot_password_container">
      <div class="forgot_password_container_title">
        <h2>Mot de passe oublié</h2>
      </div>
      <div class="forgot_password_container_object">
        <input
          type="email"
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
        <button type="button" @click="waitingUpdatePassword()">
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
        <button type="button" @click="resendConfirmationCode()">
          Renvoyer un code de confirmation
        </button>
      </div>
      <div class="forgot_password_container_button">
        <button type="button" @click="handleConfirmCode()">Confirmer</button>
      </div>
    </div>

    <div class="footer_container"></div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import PopupComponent from '~/components/attachable/PopupComponent.vue'
import { humanizeErrorMessage } from '~/utils/humanizeErrorMessage'

import inputValidations from '~/utils/inputValidations'

export default {
  components: {
    PopupComponent,
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

  methods: {
    getErrorMessage(error) {
      return humanizeErrorMessage(error)
    },
    async readResponseData(response) {
      try {
        return await response.json()
      } catch {
        return null
      }
    },
    assertResetCodeRequested(response, data) {
      if (!response.ok) {
        throw new Error(this.getErrorMessage(data?.error || data?.message))
      }

      if (data?.error || data?.success === false) {
        throw new Error(this.getErrorMessage(data.error || data.message))
      }

      if (!data?.userId) {
        throw new Error(
          this.getErrorMessage(
            data?.message ||
              "Le serveur n'a pas confirmé l'envoi du code de réinitialisation."
          )
        )
      }
    },
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
          throw new Error('Veuillez patienter quelques secondes avant de renvoyer un code.')
        }

        this.validateUserEmail(this.userEmail)
        this.validatePassword(this.userNewPassword, 8, 100)
        this.validateRepeatPassword(
          this.userRepeatNewPassword,
          this.userNewPassword
        )

        const response = await fetch('/api/auth/waiting-new-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: this.userEmail,
          }),
        })

        const data = await this.readResponseData(response)

        this.assertResetCodeRequested(response, data)

        this.userId = data.userId
        this.awaitingConfirmAccount = true
        this.popupMessage = {
          type: 'valid',
          message:
            data.message ||
            'Un code de confirmation vient de vous être envoyé par e-mail.',
        }
        this.resendCodeTimeout = true
        setTimeout(() => {
          this.resendCodeTimeout = false
        }, 10000)
      } catch (error) {
        const message = this.getErrorMessage(error)
        console.error('Erreur:', message)
        this.popupMessage = {
          type: 'error',
          message,
        }
      }
    },

    async resendConfirmationCode() {
      try {
        if (this.resendCodeTimeout) {
          throw new Error(
            'Veuillez patienter quelques secondes avant de renvoyer un code.'
          )
        }

        if (!this.userId) {
          throw new Error(
            'Impossible de renvoyer un code sans demande de réinitialisation valide.'
          )
        }

        const response = await fetch('/api/auth/waiting-new-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: this.userEmail,
          }),
        })

        const data = await this.readResponseData(response)

        this.assertResetCodeRequested(response, data)

        this.userId = data.userId
        this.popupMessage = {
          type: 'valid',
          message:
            data.message ||
            'Un nouveau code de confirmation vient de vous être envoyé.',
        }
        this.resendCodeTimeout = true
        setTimeout(() => {
          this.resendCodeTimeout = false
        }, 10000)
      } catch (error) {
        const message = this.getErrorMessage(error)
        console.error('Erreur:', message)
        this.popupMessage = {
          type: 'error',
          message,
        }
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

      if (code.length !== 6) {
        this.popupMessage = {
          type: 'error',
          message: 'Le code de confirmation doit contenir 6 caractères.',
        }
        return
      }

      const requestData = {
        code: code.toUpperCase(),
        userId: this.userId,
        newPassword: this.userNewPassword,
      }

      const url = '/api/auth/verify-confirmation-code-reset-password'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }

      try {
        const response = await fetch(url, options)
        const data = await this.readResponseData(response)

        if (!response.ok || data?.error || data?.success === false) {
          throw new Error(this.getErrorMessage(data?.error || data?.message))
        }

        this.popupMessage = {
          type: 'valid',
          message: data?.message || 'Votre mot de passe a bien été modifié.',
        }

        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)

        return data
      } catch (error) {
        const message = this.getErrorMessage(error)
        console.error('Erreur lors de la confirmation du code :', message)
        this.popupMessage = {
          type: 'error',
          message,
        }
      }
    },
  },
}
</script>
