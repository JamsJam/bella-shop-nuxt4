<template>
  <div class="returns">
    <div class="returns_container">
      <div class="returns_container_title">
        <h1>S.A.V</h1>
      </div>
      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            Vous pouvez contacter le service après-vente à tout moment à
            l'adresse mail suivante :
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <a href="mailto:serviceapresvente@bellagp.fr"><strong>serviceapresvente@bellagp.fr</strong></a>
          <ul>
            <li><p>Problèmes de réception de colis</p></li>
            <li><p>Problèmes de retour de colis</p></li>
            <li><p>Divers autres problèmes concernant votre achat</p></li>
            <li><p>Autres questions ou demandes spécifiques</p></li>
            <li>
              <p> N'oubliez pas de préciser votre numéro de commande dans le sujet de votre mail.</p>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
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
