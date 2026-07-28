<template>
  <div class="account_container_profil_page">
    <div class="account_container_title">
      <h1>Informations personnelles</h1>
      <p v-if="surname">Bonjour, {{ surname }}</p>
    </div>

    <div class="account_container_profil">
      <div class="account_container_profil_item">
        <div class="account_container_profil_item_label">
          <label for="surname">Prénom</label>
          <p>Modifier votre prénom</p>
        </div>
        <div class="account_container_profil_item_input">
          <p v-if="!editing.surname">{{ surname }}</p>
          <button v-if="!editing.surname" @click="toggleEditing('surname')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
          </button>

          <input
            id="surname"
            v-if="editing.surname"
            v-model="surname"
            v-focus="editing.surname"
          />

          <div
            v-if="editing.surname"
            class="account_container_profil_item_input_editing"
          >
            <button
              v-if="surname !== profil.surname"
              @click="saveChanges('surname')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                />
              </svg>
            </button>
            <button @click="cancelEditing('surname')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
                  />
                  <path
                    d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="account_container_profil_item">
        <div class="account_container_profil_item_label">
          <label for="name">Nom</label>
          <p>Modifier votre nom</p>
        </div>
        <div class="account_container_profil_item_input">
          <p v-if="!editing.name">{{ name }}</p>
          <button v-if="!editing.name" @click="toggleEditing('name')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
          </button>

          <input
            v-if="editing.name"
            id="name"
            v-model="name"
            v-focus="editing.name"
          />

          <div
            v-if="editing.name"
            class="account_container_profil_item_input_editing"
          >
            <button v-if="name !== profil.name" @click="saveChanges('name')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                />
              </svg>
            </button>
            <button @click="cancelEditing('name')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
                  />
                  <path
                    d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="email" class="account_container_profil_item">
        <div class="account_container_profil_item_label">
          <label for="email">Email</label>
          <p>Modifier votre adresse mail</p>
        </div>
        <div class="account_container_profil_item_input">
          <p v-if="!editing.email">{{ email }}</p>
          <button v-if="!editing.email" @click="toggleEditing('email')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
          </button>

          <input
            id="email"
            v-if="editing.email"
            v-model="email"
            v-focus="editing.email"
          />
          <div
            v-if="editing.email"
            class="account_container_profil_item_input_editing"
          >
            <button v-if="email !== profil.email" @click="saveChanges('email')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                />
              </svg>
            </button>
            <button @click="cancelEditing('email')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
                  />
                  <path
                    d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="account_container_profil_item">
        <div class="account_container_profil_item_label">
          <label for="newPassword">Mot de passe</label>
          <p>Réinitialiser votre mot de passe</p>
        </div>
        <div class="account_container_profil_item_input">
          <p v-if="!editing.password">{{ password }}</p>
          <button v-if="!editing.password" @click="toggleEditing('password')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              />
            </svg>
          </button>

          <div
            v-if="editing.password"
            class="account_container_profil_item_input_password"
          >
            <input
              id="newPassword"
              v-model="newPassword"
              placeholder="Nouveau mot de passe"
              v-focus="editing.email"
              type="password"
            />
            <input
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              placeholder="Confirmer votre nouveau mot de passe"
              v-focus="editing.email"
              type="password"
            />
          </div>
          <div
            v-if="editing.password"
            class="account_container_profil_item_input_editing"
          >
            <button @click="saveChanges('password')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                />
              </svg>
            </button>
            <button @click="cancelEditing('password')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
                  />
                  <path
                    d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="account_container_profil">
      <div class="account_container_profil_address">
        <div class="account_container_profil_address_title">
          <h4>Vos adresses</h4>
        </div>
        <div
          v-if="addresses.length"
          class="account_container_profil_address_list"
        >
          <button
            v-for="(address, index) in addresses"
            :key="address.id || index"
            type="button"
            class="account_container_profil_address_item"
            @click="selectedAddress = address"
          >
            <span>{{ address.street }}</span>
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <div v-else class="account_container_profil_address_item">
          <p>Vous n'avez aucune adresse d'enregistrée</p>
        </div>
      </div>
    </div>

    <div class="account_container_profil">
      <div class="account_container_profil_logout">
        <div class="account_container_profil_logout_buttons">
          <button
            class="account_container_profil_logout_buttons_deconnexion"
            @click="confirmationDialogBox = 'logout'"
          >
            Vous déconnecter
          </button>
        </div>
        <div class="account_container_profil_logout_buttons">
          <button
            class="account_container_profil_logout_buttons_delete"
            @click="confirmationDialogBox = 'deleteUser'"
          >
            Supprimer votre compte
          </button>
        </div>
      </div>
    </div>

    <div v-if="confirmationDialogBox === 'logout'" class="account_dialog_box">
      <p>Voulez-vous vraiment vous déconnecter ?</p>
      <button class="confirm-button" @click="openDialogBox('logout')">
        Oui
      </button>
      <button class="cancel-button" @click="cancelDialogBox()">Non</button>
    </div>

    <div
      v-if="confirmationDialogBox === 'deleteUser'"
      class="account_dialog_box"
    >
      <p>Voulez-vous vraiment supprimer votre compte ?</p>
      <button class="confirm-button" @click="openDialogBox('deleteUser')">
        Oui
      </button>
      <button class="cancel-button" @click="cancelDialogBox()">Non</button>
    </div>

    <div
      v-if="selectedAddress"
      class="account_dialog_backdrop"
      @click.self="selectedAddress = null"
    >
      <div
        class="account_dialog_box account_address_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-dialog-title"
      >
        <h2 id="address-dialog-title">{{ selectedAddress.street }}</h2>
        <p>{{ selectedAddress.full }}</p>
        <button
          type="button"
          class="cancel-button"
          @click="selectedAddress = null"
        >
          Fermer
        </button>
      </div>
    </div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import inputValidations from '~/utils/inputValidations'
import PopupComponent from '~/components/attachable/PopupComponent.vue'
import { humanizeErrorMessage } from '~/utils/humanizeErrorMessage'

export default {
  components: {
    PopupComponent,
  },
  props: {
    initialProfile: {
      type: Object,
      default: null,
    },
  },
  data() {
    const profil = this.initialProfile
      ? { ...this.initialProfile }
      : { surname: '', name: '', email: '' }

    return {
      popupMessage: null,

      surname: profil.surname,
      name: profil.name,
      email: profil.email,
      password: '********',
      newPassword: '',
      confirmNewPassword: '',

      profil,

      editing: {
        surname: false,
        name: false,
        email: false,
        password: false,
      },

      addresses: [],
      selectedAddress: null,

      confirmationDialogBox: '',
    }
  },
  computed: {},
  mounted() {
    if (this.initialProfile) {
      this.applyProfile(this.initialProfile)
    }
  },
  directives: {
    focus: {
      // Définit automatiquement le focus sur l'élément cible lorsqu'il est vrai
      mounted(el, binding) {
        if (binding.value) {
          el.focus()
        }
      },
    },
  },

  methods: {
    extractProfile(data) {
      if (Array.isArray(data?.userProfil)) return data.userProfil[0]
      if (Array.isArray(data?.member)) return data.member[0]
      if (Array.isArray(data?.['hydra:member'])) return data['hydra:member'][0]
      return data
    },

    applyProfile(data) {
      const profile = this.extractProfile(data) || {}

      this.profil = profile
      this.surname = profile.surname || profile.firstName || ''
      this.name = profile.name || profile.lastName || ''
      this.email = profile.email || ''
      this.addresses = this.normalizeAddresses(
        profile.addresses || profile.address || []
      )
    },

    normalizeAddresses(addresses) {
      const list = Array.isArray(addresses)
        ? addresses
        : addresses
          ? [addresses]
          : []

      return list.map((address, index) => {
        if (typeof address === 'string') {
          return {
            id: index,
            street: address,
            full: address,
          }
        }

        const fullAddress = address?.fullAddress || {}
        const detailedAddress = fullAddress?.address || {}
        const street =
          address?.street ||
          address?.streetName ||
          address?.shippingAddress ||
          address?.address ||
          detailedAddress?.road ||
          fullAddress?.display_name ||
          `Adresse ${index + 1}`
        const country =
          address?.country?.name ||
          address?.country?.label ||
          address?.country ||
          detailedAddress?.country
        const full =
          fullAddress?.display_name ||
          [
            address?.shippingAddress || address?.address || address?.street,
            address?.shippingAddress2 || address?.addressComplement,
            address?.postalCode || address?.zipCode,
            address?.city,
            country,
          ]
            .filter(Boolean)
            .join(', ') ||
          street

        return {
          id: address?.id ?? index,
          street,
          full,
        }
      })
    },

    cancelEditing(field) {
      switch (field) {
        case 'surname':
          this.surname = this.profil.surname
          break

        case 'name':
          this.name = this.profil.name
          break

        case 'email':
          this.email = this.profil.email
          break

        default:
          break
      }

      this.editing[field] = false
    },
    toggleEditing(field) {
      this.editing[field] = true
    },
    async saveChanges(field) {
      if (field === 'password') {
        try {
          if (this.newPassword !== this.confirmNewPassword) {
            throw new Error(`Les nouveaux mots de passe ne correspondent pas`)
          }
          this.validateNewPassword(this.newPassword, 8, 400)

          const newPassword = this.newPassword

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ newPassword }),
          }

          const response = await fetch('/api/account/profile/password', requestOptions)

          if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message)
          }

          const data = await response.json()

          this.popupMessage = {
            type: 'valid',
            message: data?.message || 'Votre mot de passe a bien été modifié.',
          }

          this.newPassword = ''
          this.confirmNewPassword = ''

          this.editing[field] = false
        } catch (error) {
          this.popupMessage = {
            type: 'error',
            message: humanizeErrorMessage(
              error,
              'Impossible de modifier votre mot de passe.'
            ),
          }
          console.error(error.message)
        }
      } else if (field === 'email') {
        try {
          this.validateNewEmail(this.email)

          if (this.email === this.profil.email) {
            throw new Error(
              "Vous devez modifier votre adresse e-mail pour l'enregistrer"
            )
          }

          const email = this.email

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email }),
          }

          const response = await fetch('/api/account/profile/email', requestOptions)

          if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message)
          }

          const data = await response.json()

          this.popupMessage = {
            type: 'valid',
            message: data?.message || 'Votre adresse e-mail a bien été modifiée.',
          }

          this.profil.email = this.email
          this.editing[field] = false
        } catch (error) {
          this.popupMessage = {
            type: 'error',
            message: humanizeErrorMessage(
              error,
              'Impossible de modifier votre adresse e-mail.'
            ),
          }
          console.error(error.message)
        }
      } else if (field === 'surname') {
        try {
          this.validateNewSurname(this.surname, 1, 100)

          if (this.surname === this.profil.surname) {
            throw new Error(
              "Vous devez modifier votre prénom pour l'enregistrer"
            )
          }

          const surname = this.surname

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ surname }),
          }

          const response = await fetch('/api/account/profile/surname', requestOptions)

          if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message)
          }

          const data = await response.json()

          this.popupMessage = {
            type: 'valid',
            message: data?.message || 'Votre prénom a bien été modifié.',
          }

          this.profil.surname = this.surname
          this.editing[field] = false
        } catch (error) {
          this.popupMessage = {
            type: 'error',
            message: humanizeErrorMessage(
              error,
              'Impossible de modifier votre prénom.'
            ),
          }
          console.error(error.message)
        }
      } else if (field === 'name') {
        try {
          this.validateNewName(this.name, 1, 100)

          if (this.name === this.profil.name) {
            throw new Error("Vous devez modifier votre nom pour l'enregistrer")
          }

          const name = this.name

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name }),
          }

          const response = await fetch('/api/account/profile/name', requestOptions)

          if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.message)
          }

          const data = await response.json()

          this.popupMessage = {
            type: 'valid',
            message: data?.message || 'Votre nom a bien été modifié.',
          }
          this.profil.name = name
          this.editing[field] = false
        } catch (error) {
          this.popupMessage = {
            type: 'error',
            message: humanizeErrorMessage(
              error,
              'Impossible de modifier votre nom.'
            ),
          }
          console.error(error.message)
        }
      } else {
        // Ajoutez ici la logique pour enregistrer les modifications pour les champs autres que le mot de passe, par exemple une requête API
      }
    },

    validateNewPassword(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le mot de passe ne peut pas être vide')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le mot de passe doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validatePassword(input)) {
        throw new Error(
          'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Le mot de passe contient des mots-clés SQL. Veuillez saisir un mot de passe valide.'
        )
      }
    },

    validateNewEmail(input) {
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

    validateNewName(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le nom ne peut pas être vide')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le nom doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphabeticDash(input)) {
        throw new Error(
          'Le nom ne doit contenir que des lettres et des tirets.'
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Le nom contient des mots-clés SQL. Veuillez saisir un nom valide.'
        )
      }
    },

    validateNewSurname(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le prénom ne peut pas être vide')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le prénom doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphabeticDash(input)) {
        throw new Error(
          'Le mot de passe contient des caractères non autorisés.'
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Le mot de passe contient une suite de caractères non autorisée.'
        )
      }
    },

    async logout() {
      try {
        const response = await fetch('/api/account/profile/logout', {
          method: 'POST',
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('La déconnexion a échoué.')
        }
        if (response.ok) {
          this.popupMessage = {
            type: 'valid',
            message: 'Vous avez bien été déconnecté.',
          }
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        }
      } catch (error) {
        this.popupMessage = {
          type: 'error',
          message: humanizeErrorMessage(
            error,
            'Impossible de vous déconnecter pour le moment.'
          ),
        }
        console.error('Erreur lors de la déconnexion:', error)
      }
    },

    async deleteUser() {
      try {
        const response = await fetch('/api/account/profile', {
          method: 'DELETE',
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('La suppression a échoué.')
        }
        if (response.ok) {
          this.popupMessage = {
            type: 'valid',
            message: 'Votre compte a bien été supprimé.',
          }
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        this.popupMessage = {
          type: 'error',
          message: humanizeErrorMessage(
            error,
            'Impossible de supprimer votre compte pour le moment.'
          ),
        }
      }
    },

    async openDialogBox(method) {
      if (method === 'logout') {
        await this.logout()
      } else if (method === 'deleteUser') {
        await this.deleteUser()
      }
      this.confirmationDialogBox = ''
    },

    cancelDialogBox() {
      this.confirmationDialogBox = ''
    },
  },
}
</script>
