<template>
  <div class="footer">
    <div class="footer_block">
      <h5>Service client</h5>
      <a href="/sav">S.A.V</a>
      <a href="/legals">Mentions légales / CGV / CGU</a>
      <a href="/confidentiality">Politique de confidentialité</a>
    </div>
    <div class="footer_block">
      <h5>Besoin d'aide</h5>
      <a href="/delivery">Livraison / Expédition</a>
      <a href="/returns">Faire un retour</a>
      <a href="/faq">FAQ</a>
    </div>
    <div class="footer_block">
      <h5>Votre compte</h5>
      <a href="/signin">S'inscrire</a>
      <a href="/login">Se connecter</a>
      <a v-if="auth" href="/account">Suivre ma commande</a>
      <a v-else-if="!auth" href="/login">Suivre ma commande</a>
    </div>
    <div class="footer_block">
      <h5>Nous contacter</h5>
      <a href="">contact@bellagp.fr</a>
      <a href="/contact">Contactez-nous</a>
      <p class="footer_paraf">Basé en Guadeloupe</p>
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
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
@use '../../sass/utils/' as *;

.footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 12;
  width: calc(100% - 6.5vh);
  height: 21.7vh;
  background-color: $beige;
  padding-right: 6.5vh;

  @media (max-width: 900px) {
    position: relative;
    flex-direction: column;
    height: calc(21.7vh * 4);
    width: 100%;
    padding-right: 0;
    padding: 4vh 0;
  }

  &_block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    height: 80%;
    color: $white;
    margin-left: 10.8vh;

    @media (max-width: 900px) {
      align-items: center;
      margin-left: 0;
    }

    h5 {
      font-size: 1.6vh;
      font-weight: 600;
      text-transform: uppercase;
      text-align: right;

      @media (max-width: 900px) {
        text-align: center;
      }
    }
    a {
      position: relative;
      font-size: 1.3vh;
      font-weight: 500;
      color: $white;
      text-align: right;

      @media (max-width: 900px) {
        text-align: center;
      }

      &:visited {
        color: $white;
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -0.5vh;
        right: 0;
        width: 0;
        height: 0.1vh;
        background-color: $white;
        transform-origin: right center;
        transition: all ease 0.2s;
      }
    }
    p {
      font-size: 1.3vh;
      font-weight: 500;
    }
  }
}
</style>
