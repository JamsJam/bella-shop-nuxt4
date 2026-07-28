<template>
  <div class="account_container_returns_page">
    <div class="account_container_title">
      <h1>Vos Retours</h1>
      <p>Bonjour, Corentin</p>
    </div>

    <div class="account_container_returns">
      <div v-if="requestClothingReturn" class="account_container_returns_form">
        <div class="account_container_returns_form_title">
          <p class="account_container_returns_form_title_clothing_name">
            {{ requestClothingReturn.product.name }}
          </p>
          <p class="account_container_returns_form_title_clothing_infos">
            {{ requestClothingReturn.product.color.name }} -
            {{ requestClothingReturn.product.size.name }} - x{{
              requestClothingReturn.product.quantity
            }}
          </p>
        </div>
        <div class="account_container_returns_form_select">
          <select
            v-model="selectedReason"
            name="clothing"
            id="clothing"
            required
          >
            <option :value="null" :selected="selectedReason === null" disabled>
              Raison de la demande
            </option>
            <option
              v-for="(reason, index) in returnReason"
              :key="index"
              :value="reason"
            >
              {{ reason }}
            </option>
          </select>
        </div>
        <div class="account_container_returns_form_note">
          <textarea
            name="note"
            id="note"
            placeholder="Notes"
            v-model="returnNotes"
          ></textarea>
        </div>
        <div class="account_container_returns_form_button">
          <a href="/returns">Politique de retours</a>
          <button @click="sendReturnRequest()">Faire un retour</button>
        </div>
      </div>

      <div
        v-for="(returnEl, index) in returns"
        :key="index"
        class="account_container_returns_item"
      >
        <div class="account_container_returns_item_title">
          <h4>Retour n*{{ returnEl.id }}</h4>
          <p class="account_container_returns_form_title_clothing_name">
            {{ returnEl.product.name }}
          </p>
          <p class="account_container_returns_form_title_clothing_infos">
            {{ returnEl.product.color.name }} -
            {{ returnEl.product.size.name }} / x{{ returnEl.product.quantity }}
          </p>
          <p class="account_container_returns_form_title_clothing_infos">
            Facture n*{{ returnEl.invoice_id }}
          </p>
          <p class="account_container_returns_item_title_status_wrong">
            {{ returnEl.status }}
          </p>
          <button @click="cancelReturn(returnEl.id)">
            Annuler votre retour
          </button>
        </div>
      </div>
    </div>

    <div v-if="confirmationDialogBox" class="account_dialog_box">
      <p>Voulez-vous vraiment annuler le retour {{ cancelReturnId }}</p>
      <button class="confirm-button" @click="confirmDialogBox()">Oui</button>
      <button class="cancel-button" @click="cancelDialogBox()">Non</button>
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
    auth: {
      type: Boolean,
      default: false,
    },
    requestClothingReturn: {
      type: Object,
    },
  },
  data() {
    return {
      popupMessage: null,
      returns: [],

      selectedReason: null,
      returnReason: [
        'Taille trop petite',
        'Taille trop grande',
        'Article endommagé ou défectueux',
        'Article incorrect reçu',
        'Ne correspond pas à la description sur le site',
        'Article reçu en double',
        'Autre',
      ],
      returnNotes: null,
      cancelReturnId: null,
      confirmationDialogBox: false,
    }
  },
  computed: {},
  mounted() {
    this.fetchOrders()
  },

  methods: {
    fetchOrders(index = 0) {
      fetch(`/api/account/returns?index=${index}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La réponse du serveur n'est pas valide")
          }
          return response.json()
        })
        .then((data) => {
          // Gérer les données de la réponse

          this.returns = data.returns.map((returns) => {
            return {
              ...returns,
              product: JSON.parse(returns.product),
            }
          })
        })
        .catch((error) => {
          // Gérer les erreurs
          console.error('Erreur lors de la récupération des retours :', error)
        })
    },

    validateNote(input, minLength, maxLength) {
      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `La note doit être compris entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateBasicMessage(input)) {
        throw new Error(
          "La note n'est pas valide, il ne doit pas contenir de caractère interdit."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'La note contient des mots-clés SQL. Veuillez saisir un message valide.'
        )
      }
    },
    async sendReturnRequest() {
      try {
        this.validateNote(this.returnNotes, 0, 500)

        const response = await fetch('/api/account/returns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            product: this.requestClothingReturn.product,
            invoiceId: this.requestClothingReturn.invoiceId,
            reason: this.selectedReason,
            notes: this.returnNotes,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error('Impossible d’enregistrer votre demande de retour.')
        }

        if (response.ok) {
          this.popupMessage = {
            type: 'valid',
            message:
              'Votre demande de retour a bien été enregistrée. Nous attendons vos articles.',
          }

          data.return.status = 'En attente de la reception de vos produits'
          this.returns.push(data.return)

          this.$emit('valid-return-request')
        }
      } catch (error) {
        console.error(error)
        this.popupMessage = {
          type: 'error',
          message: humanizeErrorMessage(
            error,
            'Impossible d’enregistrer votre demande de retour.'
          ),
        }
      }
    },
    cancelReturn(returnId) {
      this.confirmationDialogBox = true
      this.cancelReturnId = returnId
    },
    async confirmDialogBox() {
      try {
        console.log(this.cancelReturnId)

        const response = await fetch(
          `/api/account/returns/cancel?returnId=${this.cancelReturnId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error('Impossible d’annuler cette demande de retour.')
        }

        if (response.ok) {
          this.confirmationDialogBox = false

          this.popupMessage = {
            type: 'valid',
            message: 'Votre demande de retour a bien été annulée.',
          }

          this.returns = this.returns.filter(
            (el) => el.id !== this.cancelReturnId
          )
        }
      } catch (error) {
        console.error(error)
        this.popupMessage = {
          type: 'error',
          message: humanizeErrorMessage(
            error,
            'Impossible d’annuler cette demande de retour.'
          ),
        }
      }
    },
    cancelDialogBox() {
      this.confirmationDialogBox = false
    },
  },
}
</script>
