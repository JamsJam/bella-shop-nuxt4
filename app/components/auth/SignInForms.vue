<template>
  <div class="signin">
    <div class="signin_page">
      <div class="signin_page_container">
        <div class="signin_page_forms">
          <div v-if="!awaitingConfirmAccount" class="signin_page_forms">
            <div class="signin_page_forms_title">
              <h1>Inscription</h1>
              <div class="signin_page_forms_subtitle">
                <p>C’est parti ! Rejoins-nous et commence ton shopping.</p>
              </div>
            </div>

            <div class="signin_page_forms_inputs">
              <div class="inputWrapper">
                <label for="user-e-mail">E-mail</label>
                <input
                  id="user-email"
                  type="email"
                  v-model="email"
                  placeholder="Adresse e-mail"
                />
              </div>

              <div class="inputWrapper">
                <label for="user-password">Crée ton mot de passe</label>
                <input
                  id="user-password"
                  type="password"
                  v-model="password"
                  placeholder="Mot de passe"
                />
              </div>

              <div class="inputWrapper">
                <label for="user-repeatpassword"
                  >Confirmer ton mot de passe</label
                >
                <input
                  id="user-repeatpassword"
                  type="password"
                  v-model="repeatPassword"
                  placeholder="Répéter le mot de passe"
                />
              </div>

              <button class="button--secondary" @click="handleSignIn()">
                Rejoins Bella
              </button>

              <div class="login_container_forms_buttons">
                <p>
                  Tu as déjà ton compte ?
                  <a href="/login" class="login_container_forms_buttons_signin"
                    >Connecte-toi</a
                  >
                </p>
              </div>
            </div>
          </div>

          <div v-if="awaitingConfirmAccount" class="signin_page_forms_code">
            <div class="signin_page_forms_code_title">
              <h3>
                Confirmer votre compte avec le code envoyé à votre adresse mail
              </h3>
              <p>{{ email }}</p>
            </div>
            <div class="signin_page_forms_code_inputs">
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
            <div class="signin_page_forms_code_send_new_code">
              <button @click="resendConfirmationCode()">
                Renvoyer un code de confirmation
              </button>
            </div>
            <div class="signin_page_forms_buttons">
              <button class="button--primary" @click="handleConfirmCode()">
                Confirmer
              </button>
            </div>
          </div>
        </div>

        <div class="signin_page_image">
          <img src="/images/logos/bella_logo_black.png" alt="" />
          <p>
            Découvre nos vêtements, accessoires, nouveautés. On est là pour te
            simplifier la vie et te faire plaisir avec des pièces qui te
            ressemblent. Prête à trouver ton prochain coup de cœur ?
          </p>
        </div>
      </div>
    </div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
// import PopupComponent from '~/components/attachable/PopupComponent.vue'

export default {
  components: {
    // PopupComponent,
  },

  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      awaitingConfirmAccount: false,
      code: ['', '', '', '', '', ''],
      userId: null,
      resendCodeTimeout: false,
      popupMessage: null,
    }
  },

  mounted() {},

  methods: {
    async handleSignIn() {
      const userData = {
        email: this.email,
        password: this.password,
      }

      const url = `${this.$store.state.apiUrl}/auth/signup`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
        credentials: 'include',
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (this.password !== this.repeatPassword) {
          throw new Error('Les mots de passe doivent correspondre')
        }

        if (response.ok) {
          this.awaitingConfirmAccount = true
          this.userId = data.userId
        }

        if (!response.ok) {
          throw data.error[0]
        }

        return data
      } catch (error) {
        this.popupMessage = {
          type: 'error',
          message: error,
        }
        return error
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
      }

      const url = `${this.$store.state.apiUrl}/auth/verify-confirmation-code`
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
          await this.handleLogin()
        } else {
          // Gérer les erreurs
          console.error('Erreur lors de la confirmation du code :', data.error)
          this.popupMessage = {
            type: 'error',
            message: 'Erreur lors de la confirmation du code',
          }
        }

        return data
      } catch (error) {
        console.error('Erreur lors de la confirmation du code :', error)
        this.popupMessage = {
          type: 'error',
          message: 'Erreur lors de la confirmation du code',
        }
        return error
      }
    },

    async handleLogin() {
      const userData = {
        email: this.email,
        password: this.password,
      }
      const url = `${this.$store.state.apiUrl}/auth/login`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
        credentials: 'include',
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          this.$router.push('/')
        } else {
          if (data.type === 'confirmation_code') {
            this.userId = data.userId
            this.awaitingConfirmAccount = true
          }
          throw data.error
        }

        return data
      } catch (error) {
        console.error(error)

        this.popupMessage = {
          type: 'error',
          message: error,
        }
      }
    },

    async resendConfirmationCode() {
      const requestData = {
        userEmail: this.email,
      }

      const url = `${this.$store.state.apiUrl}/auth/resend-confirmation-code`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }

      try {
        if (this.resendCodeTimeout) {
          throw new Error('Reessayer dans quelques secondes')
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          this.popupMessage = {
            type: 'valid',
            message: data.message,
          }
          this.resendCodeTimeout = true
          setTimeout(() => {
            this.resendCodeTimeout = false
          }, 10000)
        }

        if (!response.ok) {
          this.resendCodeTimeout = true
          setTimeout(() => {
            this.resendCodeTimeout = false
          }, 10000)
          throw data.error
        }
      } catch (error) {
        console.error(error)
        this.popupMessage = {
          type: 'error',
          message: error,
        }
      }
    },
  },
}
</script>
