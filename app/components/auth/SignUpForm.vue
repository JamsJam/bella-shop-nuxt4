<template>
  <div class="signup">
    <div class="signup_page">
      <div class="signup_page_container">
        <div class="signup_page_forms">
          <form
            v-if="!awaitingConfirmAccount"
            class="signup_page_forms"
            @submit.prevent="handleSignUp"
          >
            <div class="signup_page_forms_title">
              <h1>Inscription</h1>
              <div class="signup_page_forms_subtitle">
                <p>C’est parti ! Rejoins-nous et commence ton shopping.</p>
              </div>
            </div>

            <div class="signup_page_forms_inputs">
              <div class="inputWrapper">
                <label for="user-email">E-mail</label>
                <input
                  id="user-email"
                  type="email"
                  v-model="email"
                  placeholder="Adresse e-mail"
                  required
                />
              </div>

              <div class="inputWrapper">
                <label for="user-password">Crée ton mot de passe</label>
                <input
                  id="user-password"
                  type="password"
                  v-model="password"
                  placeholder="Mot de passe"
                  required
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
                  required
                />
              </div>

              <button class="button--secondary" type="submit">
                Rejoins Bella
              </button>

              <div class="signup_page_forms_buttons">
                <p>
                  Tu as déjà ton compte ?
                  <NuxtLink to="/login" class="signup_page_forms_buttons_login"
                    >Connecte-toi</NuxtLink
                  >
                </p>
              </div>
            </div>
          </form>

          <div v-if="awaitingConfirmAccount" class="signup_page_forms_code">
            <div class="signup_page_forms_code_title">
              <h3>
                Confirmer votre compte avec le code envoyé à votre adresse mail
              </h3>
              <p>{{ email }}</p>
            </div>
            <div class="signup_page_forms_code_inputs">
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
            <div class="signup_page_forms_code_send_new_code">
              <button @click="resendConfirmationCode()">
                Renvoyer un code de confirmation
              </button>
            </div>
            <div class="signup_page_forms_buttons">
              <button class="button--primary" @click="handleConfirmCode()">
                Confirmer
              </button>
            </div>
          </div>
        </div>

        <div class="signup_page_image">
          <img src="/images/logos/bella_logo_black.png" alt="" />
          <p>
            Découvre nos vêtements, accessoires, nouveautés. On est là pour te
            simplifier la vie et te faire plaisir avec des pièces qui te
            ressemblent. Prête à trouver ton prochain coup de cœur ?
          </p>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',
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
    getAuthUrl(path) {
      return `/api/auth/${path}`
    },
    async handleSignUp() {
      const userData = {
        email: this.email,
        password: this.password,
      }

      const url = this.getAuthUrl('signup')
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( userData ),
        credentials: 'include',
      }

      try {
        
        if (this.password !== this.repeatPassword) {
          throw new Error('Les mots de passe doivent correspondre')
        }
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          this.awaitingConfirmAccount = true
          this.userId = data.id ?? data.userId
        }

        if (!response.ok) {
          throw data.error[0]
        }

        return data
      } catch (error) {
        // this.popupMessage = {
        //   type: 'error',
        //   message: error,
        // }
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
        id: this.userId,
      }

      const url = this.getAuthUrl('verify-confirmation-code')
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
      const url = this.getAuthUrl('login')
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
            this.userId = data.id ?? data.userId
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

      const url = this.getAuthUrl('resend-confirmation-code')
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
