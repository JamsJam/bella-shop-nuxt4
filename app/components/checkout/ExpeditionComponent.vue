<template>
  <div class="expedition">
    <div class="expedition_container">
      <div class="expedition_container_box">
        <div class="expedition_container_box_wrapper">
          <div class="expedition_container_box_wrapper_title">
            <h2>Mode d'expedition</h2>
          </div>

          <DeliveryCountrySelect
            :disabled="expeditionStatus === 'payment'"
            @change="handleCountryChange"
          />

          <div
            class="expedition_container_box_wrapper_delivery_option"
            v-for="option in deliveryOptionsView"
            :key="option.value"
            :class="{
              selectedDelivery:
                selectedDelivery === option.value &&
                expeditionStatus !== 'payment',
            }"
          >
            <div class="expedition_container_box_wrapper_delivery_option_box">
              <input
                type="radio"
                :id="option.label.title"
                :value="option.value"
                v-model="selectedDelivery"
                :disabled="expeditionStatus === 'payment'"
              />
              <label :for="option.label.title">
                <span class="delivery_label_title">{{
                  option.label.title
                }}</span>
              </label>
              <p>{{ option.price }}</p>
            </div>
            <div
              v-if="
                selectedDelivery === option.value &&
                expeditionStatus !== 'payment'
              "
              class="expedition_container_box_wrapper_delivery_option_container"
            >
              <div
                class="expedition_container_box_wrapper_delivery_option_input_box"
              >
                <div
                  class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split"
                >
                  <label
                    :class="{
                      label_focused:
                        isInputFocused === 'inputFocus_10' || name !== '',
                    }"
                    for="name"
                    >Nom*</label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    @focus="handleInputFocus(10)"
                    @blur="handleInputBlur"
                    required
                  />
                </div>

                <div
                  class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split"
                >
                  <label
                    :class="{
                      label_focused:
                        isInputFocused === 'inputFocus_11' || surname !== '',
                    }"
                    for="surname"
                    >Prénom*</label
                  >
                  <input
                    type="text"
                    id="surname"
                    v-model="surname"
                    @focus="handleInputFocus(11)"
                    @blur="handleInputBlur"
                    required
                  />
                </div>
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <label
                  for="shippingTitle"
                  :class="{
                    label_focused:
                      isInputFocused === 'inputFocus_1' || shippingTitle !== '',
                  }"
                  >Titre de l'adresse de livraison*</label
                >
                <input
                  type="text"
                  id="shippingTitle"
                  v-model="shippingTitle"
                  @focus="handleInputFocus(1)"
                  @blur="handleInputBlur"
                  required
                />
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <label
                  for="address"
                  :class="{
                    label_focused:
                      isInputFocused === 'inputFocus_2' ||
                      shippingAddress !== '',
                  }"
                  >Adresse*</label
                >
                <input
                  type="text"
                  id="address"
                  v-model="shippingAddress"
                  @focus="handleInputFocus(2)"
                  @blur="handleInputBlur"
                  required
                />
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <label
                  for="address2"
                  :class="{
                    label_focused:
                      isInputFocused === 'inputFocus_3' ||
                      shippingAddress2 !== '',
                  }"
                  >Complément d'adresse</label
                >
                <input
                  type="text"
                  id="address2"
                  v-model="shippingAddress2"
                  @focus="handleInputFocus(3)"
                  @blur="handleInputBlur"
                />
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <label
                  for="lieuDit"
                  :class="{
                    label_focused:
                      isInputFocused === 'inputFocus_4' || lieuDit !== '',
                  }"
                  >Lieu-dit</label
                >
                <input
                  type="text"
                  id="lieuDit"
                  v-model="lieuDit"
                  @focus="handleInputFocus(4)"
                  @blur="handleInputBlur"
                />
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input_box"
              >
                <div
                  class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split"
                >
                  <label
                    for="postalCode"
                    :class="{
                      label_focused:
                        isInputFocused === 'inputFocus_5' || postalCode !== '',
                    }"
                    >Code Postal*</label
                  >
                  <input
                    type="text"
                    id="postalCode"
                    v-model="postalCode"
                    @focus="handleInputFocus(5)"
                    @blur="handleInputBlur"
                    required
                  />
                </div>

                <div
                  class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split"
                >
                  <label
                    :class="{
                      label_focused:
                        isInputFocused === 'inputFocus_6' || city !== '',
                    }"
                    for="city"
                    >Ville*</label
                  >
                  <input
                    type="text"
                    id="city"
                    v-model="city"
                    @focus="handleInputFocus(6)"
                    @blur="handleInputBlur"
                    required
                  />
                </div>
              </div>

              <div
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <!--<div class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split">
                  <div class="expedition_container_box_wrapper_delivery_option_input_box_select">
                    <select id="country" v-model="selectedTel">
                      <option v-for="tel in telCountries" :value="tel.value">{{ tel.value }}</option>
                    </select>
                  </div>
                </div>-->

                <!--<div class="expedition_container_box_wrapper_delivery_option_input expedition_container_box_wrapper_delivery_option_input_box_split">
                </div>-->
                <label
                  :class="{
                    label_focused:
                      isInputFocused === 'inputFocus_7' || tel !== '',
                  }"
                  for="tel"
                  >Tél.mobile*</label
                >
                <input
                  type="tel"
                  id="tel"
                  v-model="tel"
                  @focus="handleInputFocus(7)"
                  @blur="handleInputBlur"
                  required
                />
              </div>

              <!--Etat initial-->
              <!--<div v-if="selectedCountry === 'GP' && selectedDelivery === 4.50" class="expedition_container_box_wrapper_delivery_option_input">
                <p>*Titre de l'adresse de livraison : (domicile, travail, ..)</p>
              </div>

              <div v-if="selectedCountry === 'GP' && selectedDelivery === 0.00" class="expedition_container_box_wrapper_delivery_option_input">
                <p>*Veuillez saisir toutes les informations même dans le cadre d'un retrait afin de compléter votre fiche
                  client. Les détails vous serons communiqués par mail pour la réception en point retrait Bella.</p>
              </div>-->

              <div
                v-if="selectedDelivery === 4.5"
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <p>
                  *Titre de l'adresse de livraison : (domicile, travail, ..)
                </p>
              </div>

              <div
                v-if="selectedDelivery === 0.0"
                class="expedition_container_box_wrapper_delivery_option_input"
              >
                <p>
                  *Veuillez saisir toutes les informations même dans le cadre
                  d'un retrait afin de compléter votre fiche client. Les détails
                  vous serons communiqués par mail pour la réception en point
                  retrait Bella.
                </p>
              </div>

              <div
                v-if="addressBook"
                class="expedition_container_box_wrapper_delivery_option_address_book"
              >
                <div
                  class="expedition_container_box_wrapper_delivery_option_address_book_container"
                >
                  <div
                    class="expedition_container_box_wrapper_delivery_option_address_book_container_button"
                  >
                    <button @click="useAddressBook()">
                      Utiliser cette adresse
                    </button>
                  </div>
                  <p>{{ addressBook.fullAddress.display_name }}</p>
                </div>
              </div>
            </div>

            <div class="expedition_container_box_wrapper_save_delivery">
              <input
                type="checkbox"
                id="saveAddressCheckbox"
                v-model="saveAddress"
              />
              <label for="saveAddressCheckbox">Enregistrer cette adresse</label>
            </div>
          </div>

          <div
            v-if="expeditionStatus !== 'payment'"
            class="expedition_container_box_wrapper_go_to_checkout_button"
          >
            <button :disabled="paymentLoading" @click="handlePaiement()">
              {{ paymentLoading ? 'Redirection…' : 'Valider et payer' }}
            </button>
          </div>
        </div>

        <div class="expedition_container_box_wrapper">
          <div class="expedition_container_box_wrapper_title">
            <h2>Récapitulatif</h2>
          </div>

          <div class="expedition_container_box_wrapper_summary">
            <div class="expedition_container_box_wrapper_summary_subtitle">
              <h4>{{ totalItems }} Article(s)</h4>
              <p>{{ subTotal }} €</p>
            </div>
            <div
              v-if="shippingStore.selectedCountry"
              class="expedition_container_box_wrapper_summary_subtitle"
            >
              <h4>Livraison</h4>
              <p>{{ formatPriceDelivery }} €</p>
            </div>
            <div class="expedition_container_box_wrapper_summary_subtitle">
              <h4>TVA</h4>
              <p>{{ taxes }} €</p>
            </div>
          </div>

          <div class="expedition_container_box_wrapper_summary">
            <div class="expedition_container_box_wrapper_summary_subtitle">
              <h3>Total</h3>
              <p>{{ total }} €</p>
            </div>
          </div>

          <div class="expedition_container_box_wrapper_summary">
            <div class="expedition_container_box_wrapper_summary_items">
              <div
                class="expedition_container_box_wrapper_summary_item"
                v-for="(product, index) in cartData"
                :key="index"
              >
                <div class="expedition_container_box_wrapper_summary_item_container">
                  <p>{{ product.productName }}</p>
                  <p>x{{ product.quantity }}</p>
                  <p>Prix unitaire : {{ formatPrice(product.unitPrice) }}</p>
                  <p>
                    {{ product.color?.name || 'Couleur non selectionnee' }} /
                    {{ product.size?.name || product.size }}
                  </p>
                </div>
                <div class="expedition_container_box_wrapper_summary_item_price">
                  <p>{{ formatPrice(product.unitPrice * product.quantity) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!--<div v-if="confirmAdress && selectAddress" class="expedition_container_box_confirm_address">
          <div class="expedition_container_box_confirm_address_box">
            <div class="expedition_container_box_confirm_address_box_back_button">
              <button @click="backToExpedition()">Retourner au choix d'expedition</button>
            </div>
            <h5 v-if="selectAddress.length > 1" >Nous avons trouvez plusieurs correspondances</h5>
            <div v-else-if="selectAddress.length === 0" class="expedition_container_box_confirm_address_box_no_address">
              <h5>Nous n'avons pas trouvé de correspondance avec votre addresse</h5>
              <a href="/contact">Contacter le support</a>
            </div>
            <div v-for="(address, index) in selectAddress" :key="index" class="expedition_container_box_confirm_address_box_item">
              <p>{{ address.display_name }}</p>
              <a href="/contact" v-if="selectAddress.length === 1">Si ce n'est pas votre addresse contacter le support</a>
              <button v-if="selectAddress.length > 1" @click="validAddress(address)">Choisir cette adresse</button>
            </div>
            <div v-if="selectAddress.length === 1" class="expedition_container_box_confirm_address_box_confirm_button">
              <button @click="validAddress(selectAddress[0])">Confirmer cette adresse</button>
            </div>
          </div>
        </div>-->

      </div>
    </div>

    <PopupComponent :popup_message="popupMessage" />
  </div>
</template>

<script>
import DeliveryCountrySelect from '~/components/checkout/DeliveryCountrySelect.vue'
import { decryptData, encryptData } from '~/utils/crypto'
import inputValidations from '~/utils/inputValidations'
import PopupComponent from '~/components/attachable/PopupComponent.vue'
import { useCartStore } from '~/stores/cart'
import { useShippingStore } from '~/stores/shipping'
import { humanizeErrorMessage } from '~/utils/humanizeErrorMessage'

export default {
  components: {
    DeliveryCountrySelect,
    PopupComponent,
  },
  props: {
    initialCountries: {
      type: Array,
      default: () => [],
    },
    initialVat: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const cartStore = useCartStore()
    const shippingStore = useShippingStore()
    shippingStore.load()
    shippingStore.hydrateCheckoutConfig(
      props.initialCountries,
      props.initialVat
    )

    return {
      cartStore,
      shippingStore,
    }
  },
  data() {
    return {
      outOfStock: false,
      paymentLoading: false,
      popupMessage: null,
      addressBook: null,
      selectedDelivery: null, // Ajouter selectedDelivery à vos données
      isInputFocused: null,

      name: '',
      surname: '',

      selectedCountry: 'GP',
      // countries: [
      //   {
      //     label: 'Guadeloupe',
      //     value: 'GP',
      //     flag: '/images/checkout/flags/guadeloupe_flag.png',
      //     tel: '+590 690',
      //   },
      //   {
      //     label: 'Martinique',
      //     value: 'MQ',
      //     flag: '/images/checkout/flags/martinique_flag.png',
      //     tel: '+596 691',
      //   },
      //   {
      //     label: 'Saint-martin',
      //     value: 'MF',
      //     flag: '/images/checkout/flags/france_flag.png',
      //     tel: '+33',
      //   },
      //   {
      //     label: 'France',
      //     value: 'FR',
      //     flag: '/images/checkout/flags/france_flag.png',
      //     tel: '+33',
      //   },
      // ],

      // deliveryOptions: [
      //   {
      //     label: { title: 'Livraison a domicile' },
      //     value: 4.5,
      //     price: '4.50 €',
      //   },
      //   // { label: {title: 'Point de retrait'}, value: 0.00, price: '0.00 €'}
      // ],

      addressSuggestions: [],
      selectAddress: null,

      telCountries: [
        { label: 'Guadeloupe', value: '+590 690' },
        { label: 'France', value: '+33' },
      ],

      municipalities: [
        {
          id: 1,
          label: 'Pointe-à-Pitre',
          value: 'Pointe-à-Pitre',
          deliveryDay: 'Lundi',
        },
        {
          id: 2,
          label: 'Baie-Mahault',
          value: 'Baie-Mahault',
          deliveryDay: 'Lundi',
        },
        {
          id: 3,
          label: 'Petit-Bourg',
          value: 'Petit-Bourg',
          deliveryDay: 'Lundi',
        },
        { id: 4, label: 'Goyave', value: 'Goyave', deliveryDay: 'Lundi' },
        {
          id: 5,
          label: 'Capesterre',
          value: 'Capesterre',
          deliveryDay: 'Lundi',
        },
        { id: 6, label: 'Abymes', value: 'Abymes', deliveryDay: 'Mardi' },
        {
          id: 7,
          label: "Morne-à-L'eau",
          value: "Morne-à-L'eau",
          deliveryDay: 'Mardi',
        },
        {
          id: 8,
          label: 'Petit-Canal',
          value: 'Petit-Canal',
          deliveryDay: 'Mardi',
        },
        {
          id: 9,
          label: 'Port-Louis',
          value: 'Port-Louis',
          deliveryDay: 'Mardi',
        },
        {
          id: 10,
          label: 'Anse-Bertrand',
          value: 'Anse-Bertrand',
          deliveryDay: 'Mardi',
        },
        {
          id: 11,
          label: 'Trois-Rivières',
          value: 'Trois-Rivières',
          deliveryDay: 'Mercredi',
        },
        {
          id: 12,
          label: 'Gourbeyre',
          value: 'Gourbeyre',
          deliveryDay: 'Mercredi',
        },
        {
          id: 13,
          label: 'Saint-Claude',
          value: 'Saint-Claude',
          deliveryDay: 'Mercredi',
        },
        {
          id: 14,
          label: 'Basse-Terre',
          value: 'Basse-Terre',
          deliveryDay: 'Mercredi',
        },
        { id: 15, label: 'Baillif', value: 'Baillif', deliveryDay: 'Mercredi' },
        {
          id: 16,
          label: 'Vieux-Habitant',
          value: 'Vieux-Habitant',
          deliveryDay: 'Mercredi',
        },
        { id: 17, label: 'Lamentin', value: 'Lamentin', deliveryDay: 'Jeudi' },
        {
          id: 18,
          label: 'Saint-Rose',
          value: 'Saint-Rose',
          deliveryDay: 'Jeudi',
        },
        { id: 19, label: 'Deshaies', value: 'Deshaies', deliveryDay: 'Jeudi' },
        {
          id: 20,
          label: 'Pointe-Noire',
          value: 'Pointe-Noire',
          deliveryDay: 'Jeudi',
        },
        {
          id: 21,
          label: 'Bouillante',
          value: 'Bouillante',
          deliveryDay: 'Jeudi',
        },
        { id: 22, label: 'Gosier', value: 'Gosier', deliveryDay: 'Vendredi' },
        {
          id: 23,
          label: 'Saint-Anne',
          value: 'Saint-Anne',
          deliveryDay: 'Vendredi',
        },
        {
          id: 24,
          label: 'Saint-François',
          value: 'Saint-François',
          deliveryDay: 'Vendredi',
        },
        { id: 25, label: 'Moule', value: 'Moule', deliveryDay: 'Vendredi' },
      ],

      deliveryDays: [
        {
          day: 'Lundi',
          dayNumber: 1,
          municipalities: [
            {
              id: 1,
              label: 'Pointe-à-Pitre',
              value: 'Pointe-à-Pitre',
              deliveryDay: 'Lundi',
            },
            {
              id: 2,
              label: 'Baie-Mahault',
              value: 'Baie-Mahault',
              deliveryDay: 'Lundi',
            },
            {
              id: 3,
              label: 'Petit-Bourg',
              value: 'Petit-Bourg',
              deliveryDay: 'Lundi',
            },
            { id: 4, label: 'Goyave', value: 'Goyave', deliveryDay: 'Lundi' },
            {
              id: 5,
              label: 'Capesterre',
              value: 'Capesterre',
              deliveryDay: 'Lundi',
            },
          ],
        },
        {
          day: 'Mardi',
          dayNumber: 2,
          municipalities: [
            { id: 6, label: 'Abymes', value: 'Abymes', deliveryDay: 'Mardi' },
            {
              id: 7,
              label: "Morne-à-L'eau",
              value: "Morne-à-L'eau",
              deliveryDay: 'Mardi',
            },
            {
              id: 8,
              label: 'Petit-Canal',
              value: 'Petit-Canal',
              deliveryDay: 'Mardi',
            },
            {
              id: 9,
              label: 'Port-Louis',
              value: 'Port-Louis',
              deliveryDay: 'Mardi',
            },
            {
              id: 10,
              label: 'Anse-Bertrand',
              value: 'Anse-Bertrand',
              deliveryDay: 'Mardi',
            },
          ],
        },
        {
          day: 'Mercredi',
          dayNumber: 3,
          municipalities: [
            {
              id: 11,
              label: 'Trois-Rivières',
              value: 'Trois-Rivières',
              deliveryDay: 'Mercredi',
            },
            {
              id: 12,
              label: 'Gourbeyre',
              value: 'Gourbeyre',
              deliveryDay: 'Mercredi',
            },
            {
              id: 13,
              label: 'Saint-Claude',
              value: 'Saint-Claude',
              deliveryDay: 'Mercredi',
            },
            {
              id: 14,
              label: 'Basse-Terre',
              value: 'Basse-Terre',
              deliveryDay: 'Mercredi',
            },
            {
              id: 15,
              label: 'Baillif',
              value: 'Baillif',
              deliveryDay: 'Mercredi',
            },
            {
              id: 16,
              label: 'Vieux-Habitant',
              value: 'Vieux-Habitant',
              deliveryDay: 'Mercredi',
            },
          ],
        },
        {
          day: 'Jeudi',
          dayNumber: 4,
          municipalities: [
            {
              id: 17,
              label: 'Lamentin',
              value: 'Lamentin',
              deliveryDay: 'Jeudi',
            },
            {
              id: 18,
              label: 'Saint-Rose',
              value: 'Saint-Rose',
              deliveryDay: 'Jeudi',
            },
            {
              id: 19,
              label: 'Deshaies',
              value: 'Deshaies',
              deliveryDay: 'Jeudi',
            },
            {
              id: 20,
              label: 'Pointe-Noire',
              value: 'Pointe-Noire',
              deliveryDay: 'Jeudi',
            },
            {
              id: 21,
              label: 'Bouillante',
              value: 'Bouillante',
              deliveryDay: 'Jeudi',
            },
          ],
        },
        {
          day: 'Vendredi',
          dayNumber: 5,
          municipalities: [
            {
              id: 22,
              label: 'Gosier',
              value: 'Gosier',
              deliveryDay: 'Vendredi',
            },
            {
              id: 23,
              label: 'Saint-Anne',
              value: 'Saint-Anne',
              deliveryDay: 'Vendredi',
            },
            {
              id: 24,
              label: 'Saint-François',
              value: 'Saint-François',
              deliveryDay: 'Vendredi',
            },
            { id: 25, label: 'Moule', value: 'Moule', deliveryDay: 'Vendredi' },
          ],
        },
      ],

      deliveryDate: {
        formattedDate: "Pas d'éstimation possible",
      },

      shippingTitle: '',
      shippingAddress: '',
      shippingAddress2: '',
      lieuDit: '',
      postalCode: '',
      city: '',
      selectedTel: '',
      tel: '',
      //selectedMunicipality: 'default',

      saveAddress: true,

      expeditionStatus: '',
      shippingInfo: {},
      confirmAdress: false,
    }
  },
  computed: {
    cartData() {
      return this.cartStore.items
    },
    deliveryCost() {
      return this.shippingStore.selectedDeliveryCost
    },
    deliveryOptionsView() {
      return [
        {
          label: { title: 'Livraison a domicile' },
          value: this.deliveryCost,
          price: `${this.deliveryCost.toFixed(2)} €`,
        },
      ]
    },
    formatPriceDelivery() {
      return this.deliveryCost.toFixed(2)
    },
    // subTotal() {
    //   if (!this.cartData) return 0;
    //   console.table(this.cartData)
    //   const subTotal = (this.cartData.reduce((accumulator, product) => {
    //     return accumulator + (Math.round(100 * parseFloat(product.calculatedPrice)) * product.quantity);
    //   }, 0) / 100).toFixed(2)
    subTotal() {
      return this.cartStore.subtotal.toFixed(2)
    },

    totalItems() {
      return this.cartStore.totalItems
    },

    taxes() {
      return (
        Math.trunc(this.cartStore.subtotal * this.shippingStore.vat) / 100
      ).toFixed(2)
    },

    total() {
      const delivery = this.deliveryCost
      // const totalWithDelivery = Math.round(parseFloat(this.subTotal) * 100) + Math.round(100 * parseFloat(delivery));
      // const totalWithTaxes = totalWithDelivery + Math.round(100 * parseFloat(this.taxes));
      // const total = (totalWithTaxes / 100).toFixed(2)
      // console.log("delivery est egal à = " + this.selectedDelivery)
      // console.log("total with delivery est egal à = " + totalWithDelivery)
      // console.log("total with taxes est egal à = " + totalWithTaxes)
      // console.log("taxes  est egal à = " + this.taxes)
      // console.log("total  est egal à = " + total)
      return (this.cartStore.subtotal + delivery).toFixed(2)
    },
  },
  mounted() {
    this.cartStore.load()
    this.retrieveAddressBook()

    this.setDefaultSelectedTel()
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(price || 0))
    },
    /*
      async geocodeAddress(address, countryCode) {

        if(countryCode === 'GP'){
          countryCode = 'FR'
        }

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1&countrycodes=${encodeURIComponent(countryCode)}`);
          if (!response.ok) {
            throw new Error('Réponse de requête non valide');
          }
          const data = await response.json();
          return data
          // Traitement de la réponse
        } catch (error) {
          console.error('Erreur lors de la requête de géocodage :', error);
        } 
      },
      */

    retrieveCartData() {
      this.cartStore.load()
    },

    calculatedPrice(price, promotion) {
      if (promotion && promotion > 0) {
        // Calculer le prix après la promotion
        const discountedPrice = price - price * (promotion / 100)
        return discountedPrice.toFixed(2) // Arrondir à 2 décimales
      } else {
        // Pas de promotion, retourner le prix normal
        return price // Arrondir à 2 décimales
      }
    },

    async fetchStocks() {
      try {
        const variantIds = []
        this.cartData.map((product) => {
          variantIds.push(product.clothing_size_id)
        })

        const response = await fetch(
          `${this.$store.state.apiUrl}/clothes-size-variant/get-size-variant-stock-by-id`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ variantIds: variantIds }),
          }
        )
        const data = await response.json()

        this.cartData = this.cartData.map((product) => {
          const matchingStock = data.stocks.find(
            (stock) => stock.id === product.clothing_size_id
          )
          if (matchingStock) {
            product.stock = matchingStock.stock
          }
          if (matchingStock.stock === 0 || null) {
            this.outOfStock = true
          }
          return product
        })
      } catch (error) {
        console.error('Error fetching stocks:', error)
      }
    },

    retrieveAddressBook() {
      const addressBook = localStorage.getItem('addressBook')
      if (addressBook) {
        const decryptedAddress = decryptData(addressBook)
        this.addressBook = decryptedAddress
      }
    },

    updateLocalStorage() {
      // Encrypt and save updated cart data to localStorage
      try {
        const encryptedCartData = encryptData(this.cartData)
        localStorage.setItem('cart', encryptedCartData)
      } catch (error) {
        console.error(
          'Erreur lors de la mise à jour des données du panier dans le localStorage :',
          error
        )
      }
    },

    getCountryFlag(countryValue) {
      const country = this.countries.find(
        (country) => country.value === countryValue
      )
      return country ? country.flag : ''
    },

    handleInputFocus(inputIndex) {
      this.isInputFocused = `inputFocus_${inputIndex}`
    },

    handleInputBlur() {
      this.isInputFocused = null
    },

    setDefaultSelectedTel() {
      // Trouver le pays sélectionné
      // const selectedCountryObj = this.countries.find(country => country.value === this.selectedCountry);
      // if (selectedCountryObj) {
      //   // Trouver le code de téléphone correspondant à ce pays
      //   const correspondingTel = this.telCountries.find(tel => tel.label === selectedCountryObj.label);
      //   if (correspondingTel) {
      //     // Définir selectedTel sur le code de téléphone correspondant
      //     this.selectedTel = correspondingTel.value;
      //   }
      // }
      return
    },

    handleCountryChange(country) {
      this.selectedDelivery = Number(country?.deliveryFee || 0)
    },

    useAddressBook() {
      if (this.addressBook) {
        this.name = this.addressBook.name || ''
        this.surname = this.addressBook.surname || ''
        this.shippingTitle = this.addressBook.shippingTitle || ''
        this.shippingAddress = this.addressBook.shippingAddress || ''
        this.shippingAddress2 = this.addressBook.shippingAddress2 || ''
        this.lieuDit = this.addressBook.lieuDit || ''
        this.postalCode = this.addressBook.postalCode || ''
        this.city = this.addressBook.city || ''
        this.selectedTel = this.addressBook.selectedTel || ''
        this.tel = this.addressBook.tel || ''
        //  this.selectedMunicipality = this.addressBook.selectedMunicipality || '';
        if (this.addressBook.country) {
          this.shippingStore.selectCountry(this.addressBook.country)
        }
        this.saveAddress = false
      }
    },

    // Validation Input Methods :

    validateShippingDestination(input) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Vous devez choisir votre pays.')
      }

      if (!this.shippingStore.countries.some((country) => country.code === input)) {
        throw new Error("Le pays choisi n'existe pas.")
      }
    },

    validateName(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Votre nom ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Votre nom doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericSpaceDashUnderscore(input)) {
        throw new Error(
          "Votre nom n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces, des tirets et des traits de soulignement."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Votre nom contient des mots-clés SQL. Veuillez saisir un titre valide.'
        )
      }
    },

    validateSurname(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Votre prénom ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Votre prénom doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericSpaceDashUnderscore(input)) {
        throw new Error(
          "Votre prénom n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces, des tirets et des traits de soulignement."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Votre prénom contient des mots-clés SQL. Veuillez saisir un titre valide.'
        )
      }
    },

    validateShippingTitle(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error(
          "Le titre de l'adresse de livraison ne peut pas être vide."
        )
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le titre de l'adresse de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericSpaceDashUnderscore(input)) {
        throw new Error(
          "Le titre de l'adresse de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces, des tirets et des traits de soulignement."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          "Le titre de l'adresse de livraison contient des mots-clés SQL. Veuillez saisir un titre valide."
        )
      }
    },

    validateShippingAddress(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error("L'adresse de livraison ne peut pas être vide.")
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `L'adresse de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericCommaSpace(input)) {
        throw new Error(
          "L'adresse de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces et des virgules."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          "L'adresse de livraison contient des mots-clés SQL. Veuillez saisir une adresse valide."
        )
      }
    },

    validateShippingAddressComplement(input, minLength, maxLength) {
      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le complément d'adresse de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericCommaSpace(input)) {
        throw new Error(
          "Le complément d'adresse de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces et des virgules."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          "Le complément d'adresse de livraison contient des mots-clés SQL. Veuillez saisir un complément d'adresse valide."
        )
      }
    },

    validateLieuDit(input, minLength, maxLength) {
      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le lieu-dit de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericSpace(input)) {
        throw new Error(
          "Le lieu-dit de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces et des virgules."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'Le lieu-dit de livraison contient des mots-clés SQL. Veuillez saisir un nom de lieu-dit valide.'
        )
      }
    },

    validatePostalCode(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le code postal de livraison ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le code postal de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateNumeric(input)) {
        throw new Error(
          "Le code postal de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des des chiffres."
        )
      }
    },

    validateCity(input, minLength, maxLength) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('La ville de livraison ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `La ville de livraison doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validateAlphanumericSpaceDashUnderscore(input)) {
        throw new Error(
          "La ville de l'adresse de livraison n'est pas valide. Assurez-vous d'utiliser uniquement des lettres majuscules et minuscules, des chiffres, des espaces, des tirets et des traits de soulignement."
        )
      }

      if (inputValidations.containsSQLKeywords(input)) {
        throw new Error(
          'La ville de livraison contient des mots-clés SQL. Veuillez saisir un nom de ville valide.'
        )
      }
    },

    validatePhoneNumber(input, minLength, maxLength, country) {
      if (!inputValidations.isNotEmpty(input)) {
        throw new Error('Le numéro de téléphone ne peut pas être vide.')
      }

      if (!inputValidations.validateLength(input, minLength, maxLength)) {
        throw new Error(
          `Le numéro de téléphone doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères.`
        )
      }

      if (!inputValidations.validatePhoneNumber(input, country)) {
        throw new Error(
          "Le numéro de téléphone n'est pas valide. Assurez vous d'utiliser des chiffres et de donner un numéro existant."
        )
      }
    },

    async handlePaiement() {
      this.paymentLoading = true
      this.popupMessage = null

      try {
        // if (this.outOfStock) {
        //   throw new Error('Un produit est en rupture de stock')
        // }
        // Validation de shippingTitle
        this.validateName(this.name, 0, 100)
        this.validateSurname(this.surname, 0, 100)
        this.validateShippingDestination(this.shippingStore.selectedCountryCode)
        this.validateShippingTitle(this.shippingTitle, 3, 400)
        this.validateShippingAddress(this.shippingAddress, 3, 400)
        this.validateShippingAddressComplement(this.shippingAddress2, 0, 400)
        this.validateLieuDit(this.lieuDit, 0, 400)
        this.validatePostalCode(this.postalCode, 5, 10)
        this.validateCity(this.city, 3, 400)
        this.validatePhoneNumber(
          this.tel,
          0,
          20,
          this.shippingStore.selectedCountryCode
        )

        this.shippingInfo = {
          name: this.name,
          surname: this.surname,
          shippingTitle: this.shippingTitle,
          shippingAddress: this.shippingAddress,
          shippingAddress2: this.shippingAddress2,
          lieuDit: this.lieuDit,
          postalCode: this.postalCode,
          city: this.city,
          selectedTel: this.selectedTel,
          tel: this.tel,
          country: this.shippingStore.selectedCountryCode,
          deliveryDate: this.deliveryDate,
          selectedDelivery: this.deliveryCost,
        }

        this.shippingStore.setShippingInfo(this.shippingInfo)

        const checkout = await $fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          body: {
            shippingDestination: this.shippingStore.selectedCountry?.name,
          },
          credentials: 'include',
        })

        const checkoutUrl = checkout?.checkoutUrl

        if (!checkoutUrl) {
          throw new Error("La session Stripe n'a pas retourné de lien.")
        }

        await navigateTo(checkoutUrl, { external: true })

        //  this.confirmAdress = true

        //  const response = await this.geocodeAddress(`${this.shippingInfo.shippingAddress} + ' ' + ${this.shippingInfo.city} + ' ' + ${this.shippingInfo.postalCode}`, this.selectedCountry);

        //  this.selectAddress = response
      } catch (error) {
        const message = humanizeErrorMessage(
          error,
          'Impossible de préparer le paiement. Veuillez réessayer.'
        )

        this.popupMessage = {
          type: 'error',
          message,
        }
        console.error(message)
      } finally {
        this.paymentLoading = false
      }
    },

    /*
      validAddress(address){
        this.confirmAdress = false;
        this.shippingInfo.fullAddress = address

        if (this.saveAddress) {
          this.saveShippingAddress();
        }

        this.expeditionStatus = 'payment'
      },
      */

    saveShippingAddress() {
      // Crypter shippingInfo
      const encryptedAddress = encryptData(this.shippingInfo)

      localStorage.removeItem('addressBook')

      localStorage.setItem('addressBook', encryptedAddress)
    },
  },
}
</script>
