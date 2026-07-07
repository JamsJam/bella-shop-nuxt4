import type { FAQDTO } from '#shared/dto/faq.dto.ts'

export default defineEventHandler(async (): Promise<FAQDTO> => {
    const faqContent: FAQDTO = {
        questions: [
            {
                question: "J'ai reçu la confirmation de paiement de ma commande, puis-je l'annuler ?",
                answer: "<p>Si vous avez déjà effectué votre paiement, il ne sera pas possible d'annuler votre commande. Assurez-vous de votre choix avant de procéder au paiement.</p>"
            },
            {
                question: "Je souhaites faire un retour suite à un problème lié à un article, comment procéder ?",
                answer: "<p>Dès la réception de votre commande, vous devez envoyer un mail au service après-vente (serviceapresvente@bellagp.fr) en décrivant clairement et distinctement l'objet de votre demande.</p><p>Un échange sera alors établi entre vous et le service dans le but de déterminer les causes et la pertinence de votre demande.</p><p>Les informations importantes liées au retour seront détaillées par la suite. Veuillez noter que les frais de retour sont à votre charge.</p>"
            },
            {
                question: "J'ai effectué un retour de colis, comment vais-je être remboursé ?",
                answer: "<p>Après votre échange avec le service après-vente, et l'acceptation de votre demande, vous serez remboursé une fois le colis réceptionné et vérifié par nos équipes.</p><p>Sachez que nous ne sommes pas responsables des risques (pertes, vols) qui peuvent arriver durant le retour colis.</p>"
            },
            {
                question: "J'ai vue un article la semaine dernière, et je ne le retrouve plus que dois-je faire ?",
                answer: "<p>Lorsqu'un produit n'est plus en stock il est retiré du site lors des maintenances et réassorts pour éviter la surcharge de données.</p><p>Il est préférable de sélectionner un autre article.</p>"
            },
            {
                question: "J'ai laissé un article dans mon panier et je ne le retrouve plus, où dois-je chercher ?",
                answer: "<p>Si cela ne relève pas d'une simple erreur de suppression, inutile de chercher l'article n'est plus disponible en stock.</p><p>Lors des maintenances ou réassort du site, ces articles sont retirés afin d'assurer la fluidité de votre navigation.</p>"
            },
            {
                question: "À quelle étape puis-je utiliser mon code promo ?",
                answer: "<p>Lors de votre passage en caisse, une case y est spécialement dédiée.</p><p>Il vous suffira d'inscrire le code (tel qu'indiqué) afin que la réduction s'applique au montant total de la commande.</p>"
            },
            {
                question: "J'ai plusieurs codes promos en ma possession, comment faire ?",
                answer: "<p>Lors de votre passage en caisse, une case y est spécialement dédiée.</p><p>Les codes promos ne sont pas cumulables, un code promo pour une commande. Vous utiliserez vos autres codes lors de vos prochaines commandes (attention aux dates limites d'utilisation).</p>"
            },
            {
                question: "Je n'arrive pas à me connecter à mon compte qui dois-je contacter ?",
                answer: "<p>Contactez le service client à l'adresse mail suivante contact@bellagp.fr</p>"
            },
            {
                question: "J'ai un problème lié à mon compte qui dois-je contacter ?",
                answer: "<p>Pour toutes autres questions/problèmes rencontrés, merci de nous contacter par mail contact@bellagp.fr</p>"
            }
        ]
    }

    return faqContent
})
