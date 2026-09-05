import type { StaticPageDTO } from '#shared/dto/staticPage.dto.ts'

export default defineEventHandler(async (): Promise<StaticPageDTO> => {
  return {
    title: 'Politique de confidentialité',
    blocks: [
      {
        title: 'Collecte des données',
        content: `<p>La consultation du site ne nécessite pas d'inscription ni d'identification préalable. Aucune donnée nominative n'est enregistrée pour la simple navigation.</p><p>Les données personnelles sont collectées uniquement lorsque vous utilisez les services qui le requièrent (commande, compte client, contact). Elles sont traitées conformément à la réglementation applicable.</p>`,
      },
      {
        title: 'Utilisation des données',
        content: `<p>Les informations que vous nous transmettez sont utilisées pour gérer votre commande, assurer le suivi client et améliorer nos services. Elles ne sont pas vendues à des tiers.</p><p>Si nécessaire, elles peuvent être communiquées aux prestataires intervenant dans l'exécution de votre commande (livraison, paiement).</p>`,
      },
      {
        title: 'Durée de conservation',
        content: `<p>Les données personnelles sont conservées le temps nécessaire à la gestion de votre compte et de vos commandes. Certaines informations peuvent être archivées pour respecter les obligations légales.</p>`,
      },
      {
        title: 'Droits des utilisateurs',
        content: `<p>Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données personnelles. Vous pouvez exercer ces droits en nous contactant à l'adresse contact@bellagp.fr.</p>`,
      },
    ],
  }
})
