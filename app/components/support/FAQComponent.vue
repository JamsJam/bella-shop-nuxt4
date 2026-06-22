<template>
  <div class="returns">
    <BellaHeader :auth="auth" />

    <div class="returns_container">
      <div class="returns_container_title">
        <h1>FAQ</h1>
      </div>
      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *J'ai reçu la confirmation de paiement de ma commande, puis-je
            l'annuler ?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Si vous avez déjà effectué votre paiement, il ne sera pas possible
            d'annuler votre commande. Assurez-vous de votre choix avant de
            procéder au paiement.
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *Je souhaites faire un retour suite à un problème lié à un article,
            comment procéder ?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Dès la réception de votre commande, vous devez envoyer un mail au
            service après- vente (serviceapresvente@bellagp.fr) en décrivant
            clairement et distinctement l'objet de votre demande
          </p>
          <p>
            Un échange sera alors établit entre vous et le service dans le but
            de déterminer les causes et la pertinence de votre demande
          </p>
          <p>
            Les informations importantes liées au retour seront détaillées par
            la suite. Veuillez noter que les frais de retour sont à votre
            charge.
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *J'ai effectué un retour de colis, comment vais-je être remboursé ?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Après votre échanges avec le service après-vente, et l'acceptation
            de votre demande, vous serez remboursé une fois le colis réceptionné
            et vérifié par nos équipes.
          </p>
          <p>
            Sachez que nous ne sommes pas responsables des risques (pertes,
            vols) qui peuvent arriver durant le retour colis.
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *J'ai vue un article la semaine dernière, et je ne le retrouve plus
            que dois-je faire?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Lorsqu'un produit n'est plus en stock il est retiré du site lors des
            maintenances et réassorts pour éviter la surcharge de données.
          </p>
          <p>Il est préférable de sélectionner un autre article.</p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *J'ai laissé un article dans mon panier et je ne le retrouve plus,
            où dois-je chercher ?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Si cela ne relève pas d'une simple erreur de suppression, inutile de
            chercher l'article n'est plus disponible en stock.
          </p>
          <p>
            Lors des maintenances ou réassort du site, ces articles sont retirés
            afin d'assurer la fluidité de votre navigation.
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>*À quelle étape puis-je utiliser mon code promo ?</h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Lors de votre passage en caisse, une case y est spécialement dédiée
          </p>
          <p>
            Il vous suffira d'inscrire le code (tel qu'indiqué) afin que la
            réduction s'applique au montant total de la commande.
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>*J'ai plusieurs codes promos en ma possession, comment faire?</h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Lors de votre passage en caisse, une case y est spécialement dédiée
          </p>
          <p>
            Les codes promos ne sont pas cumulables, un code promo pour une
            commande. Vous utiliserez vos autres codes lors de vos prochaines
            commandes (attention aux dates limites d'utilisation).
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>
            *Je n'arrive pas à me connecter à mon compte qui dois-je contacter ?
          </h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Contactez le service client à l'adresse mail suivante
            contact@bellagp.fr
          </p>
        </div>
      </div>

      <div class="returns_container_description">
        <div class="returns_container_description_subtitle">
          <h2>*J'ai un problème lié à mon compte qui dois-je contacter ?</h2>
        </div>
        <div class="returns_container_description_paraf">
          <p>
            Pour toutes autres questions/problèmes rencontrés, merci de nous
            contacter par mail contact@bellagp.fr
          </p>
        </div>
      </div>
    </div>

    <div class="footer_container"></div>
  </div>
</template>

<script>
import BellaHeader from '~/components/attachable/BellaHeader.vue'

export default {
  components: {
    BellaHeader,
  },
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

<style scoped lang="scss">
@import '../../sass/utils/variables';
@import '../../sass/base/base';

.returns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: $white;

  &_container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: calc(100vh - 9.7vh);
    font-family: 'Montserrat';
    width: 70%;
    margin: 20vh 0;

    @media (max-width: 1300px) {
      width: 80%;
    }

    &_title {
      max-width: 50%;

      @media (max-width: 1300px) {
        max-width: 100%;
      }
      @media (max-width: 1000px) {
        margin-top: 5vh;
      }
      @media (max-width: 900px) {
        margin-top: 10vh;
      }
      h1 {
        font-size: 3.8vh;
        font-weight: 700;
      }
      p {
        margin-top: 1vh;
        font-size: 1.7vh;
        font-weight: 500;
      }
    }
    &_description {
      max-width: 50%;
      margin-top: 3.2vh;

      @media (max-width: 1300px) {
        max-width: 100%;
      }

      &_subtitle {
        h2 {
          font-size: 1.7vh;
          font-weight: 600;
        }
      }
      &_paraf {
        p {
          margin-top: 2vh;
          font-size: 1.5vh;
          font-weight: 400;
        }
      }
    }
  }

  .navbar_area {
    width: 6.5vh;
    height: 100%;

    @media (max-width: 900px) {
      width: 0;
      height: 0;
    }
  }

  .footer_container {
    width: 100%;
    height: 21.7vh;
  }
}
</style>
