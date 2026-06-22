<template>
  <div class="delivery_ga">
    <div class="delivery_ga_container">
      <div class="delivery_ga_container_title">
        <h1>Livraison / Expédition</h1>
        <p>
          Bella offre un système de livraison dans le but de faciliter votre
          quotidien.
        </p>
      </div>
      <div class="delivery_ga_container_description">
        <p>
          Après avoir sélectionné vos articles, pris connaissance du détail de
          votre commande, vous pouvez ensuite valider et compléter vos
          informations personnelles (adresse complète, numéro de téléphone,..)
        </p>
        <div class="delivery_ga_container_description_list">
          <p>
            Vous avez le choix entre une livraison de votre colis par une
            entreprise spécialisée ou la réception en point de retrait. Vos
            colis sont préparés sous 24 à 48h suivant le paiement de la
            commande.
          </p>
        </div>
        <div class="delivery_ga_container_description_list">
          <p>
            Un mail de confirmation vous sera envoyé pour vous informer des
            détails de l'envoi ou des détails concernant les retraits (adresse,
            horaires,..)
          </p>
          <p>
            Le suivis de votre commande est consultable via votre espace
            personnel. Les délais de livraison varies selon votre destination.
          </p>
          <br />
          <p>
            Concernant les livraisons, des frais s'ajoutent au montant total de
            votre commande. (poids colis, destination, etc ..).
          </p>
          <p>
            Veuillez noter que nous ne sommes pas responsable des délais et
            retards de livraison qui peuvent être liées à divers phénomènes
            économiques, sociaux ou naturels. (voir les détails de livraison
            dans la rubrique mentions légales).
          </p>
        </div>
      </div>
    </div>

    <div class="footer_container"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},

  methods: {},
}
</script>
