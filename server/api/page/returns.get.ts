import type { StaticPageDTO } from '#shared/dto/staticPage.dto.ts'

export default defineEventHandler(async (): Promise<StaticPageDTO> => {
  return {
    title: 'Politique de retour',
    blocks: [
      {
        title: 'Procédure de retour',
        content: `<p>Pour toute demande de retour, envoyez un mail au service après-vente à l'adresse suivante : serviceapresvente@bellagp.fr en précisant l'objet de votre demande et le numéro de votre commande.</p>`,
      },
      {
        title: 'Condition de retour',
        content: `<p>Les produits doivent être renvoyés dans leur état d'origine, avec leurs étiquettes, et dans un délai raisonnable après réception.</p><p>Les articles retournés doivent être intacts et propres. Pour des raisons d'hygiène, les bodies, maillots de bain, sous-vêtements et certains accessoires ne peuvent pas être repris.</p>`,
      },
      {
        title: 'Frais de retour',
        content: `<p>Les frais de retour sont à la charge du client, sauf disposition contraire dans une offre spéciale. Le retour doit être effectué via Colissimo ou DHL selon les modalités convenues.</p>`,
      },
      {
        title: 'Remboursement',
        content: `<p>Une fois le colis réceptionné et vérifié par nos équipes, un mail vous sera envoyé pour vous informer de la décision concernant le remboursement ou l'échange.</p><p>Le remboursement est effectué selon le mode de paiement initial, dans les délais en vigueur après traitement du retour.</p>`,
      },
    ],
  }
})
