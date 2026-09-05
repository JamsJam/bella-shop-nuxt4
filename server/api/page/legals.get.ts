import type { LegalsBlockDTO, LegalsDTO } from '#shared/dto/legals.dto.ts'


export default defineEventHandler(async (): Promise<LegalsDTO> => {
    // Mock data - simulating the platform API response
    const mentionLegales: LegalsDTO = {
        LegalMentions: [
            {
                "title": "1 - Informations Légales",
                "content": "<p>Le Propriétaire est : <span>Bella Gp</span></p><p>Adresse postale du propriétaire : <span></span></p><p>Le Créateur du site est : <span>Corentin Delmée</span></p><p>Le Responsable de la publication est : <span></span></p><p> Contacter le responsable de la publication : <span>contact@bellagp.fr</span></p><p> Le responsable de la publication est une <span>personne physique</span>. </p><p>SIRET : <span>91773501100012</span></p>"
            },
            {
                "title": "2 - Hébergement",
                "content": "<p> L'hébergement du site est réalisé par la société <span>Hostinger</span> dont le siège social est situé HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre, joignable par le moyen suivant https://www.hostinger.fr/contact. </p><p>Serveur situé à Roubaix 59512 France</p>"
            },
            {
                "title": "3 - Présentation et principe",
                "content": "<p> Est désigné ci-après : <span>Utilisateur</span>, tout internaute se connectant et utilisant le site susnommé : <span>bellagp.fr</span></p><p> Le site <span>bellagp.fr</span> regroupe un ensemble de services, dans l'état, mis à la disposition des utilisateurs. Il est ici précisé que ces derniers doivent rester courtois et faire preuve de bonne foi tant envers les autres utilisateurs qu'envers le webmaster du site bellagp.fr Le site bellagp.fr est mis à jour régulièrement par Corentin Delmée. </p><p> Je m'efforce de fournir sur le site corentindelmee.fr des informations les plus précises possibles (sous réserve de modifications apportées depuis leur mise en ligne), mais ne saurait garantir l'exactitude, la complétude et l'actualité des informations diffusées sur son site, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. En conséquence, l'<span>utilisateur</span> reconnaît utiliser ces informations données (à titre indicatif, non exhaustives et susceptibles d'évoluer) sous <span>sa responsabilité exclusive</span>. </p>"
            },
            {
                "title": "4 - Accessibilité",
                "content": "<p> Le site bellagp.fr est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf interruption, programmée ou non, pour les besoins de sa maintenance ou en cas de force majeure. En cas d'impossibilité d'accès au service, bellagp.fr s'engage à faire son maximum afin de rétablir l'accès au service et s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention. N'étant soumis qu'à une obligation de moyen, bellagp.fr ne saurait être tenu pour responsable de tout dommage, quelle qu’en soit la nature, résultant d’une indisponibilité du service. </p>"
            },
            {
                "title": "5 - Liens hypertextes",
                "content": "<p> Le site bellagp.fr contient un certain nombre de liens hypertextes vers d'autres sites (partenaires, informations …) mis en place avec l'autorisation de Aurélie GOB. Cependant, Aurélie GOB n'a pas la possibilité de vérifier l'ensemble du contenu des sites ainsi visités et décline donc toute responsabilité de ce fait quand aux risques éventuels de contenus illicites. </p>"
            },
            {
                "title": "6 - Propriétés intellectuelles",
                "content": "<p> Aurélie GOB est propriétaire exclusif de tous les droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, tant sur la structure que sur les textes, images, graphismes, logo, icônes, sons, logiciels… </p><p> Toute reproduction totale ou partielle du site corentindelmee.fr, représentation, modification, publication, adaptation totale ou partielle de l'un de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Corentin Delmée, propriétaire du site à l'email : mail, à défaut elle sera considérée comme constitutive d'une contrefaçon et passible de poursuite conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle. </p>"
            }
        ],
        cgv: [

            {
                "title": 'Introduction',
                "content": "<p> Entre, la Société BELLA GP, immatriculée au Registre du Commerce et des Sociétés de Guadeloupe sous le numéro 91773501100012, dont le siège est situé au : Lot 2 rue de l'océan 97160 Le Moule, dûment habilité aux fins des présentes. La société est joignable par email ou courrier. </p><p>D’une part,</p><p> Est: la personne physique ou morale procédant à l’achat de produits ou services de la société, Ci- après, « l’Acheteur », ou « le Client ». Il a été exposé et convenu ce qui suit : </p>"
            },
            {
                "title": "PREAMBULE",
                "content": "<p> La société est vendeur de vêtements et accessoires exclusivement à destination de consommateurs, commercialisés par l’intermédiaire de son site internet www.bellagp.fr </p><p> La liste et le descriptif des produits proposés par la société peuvent être consultés sur le site susmentionné. </p>"
            },
            {
                "title": "Article 1 : Objet et dispositions générales",
                "content": "<p> Les présentes Conditions Générales de Vente déterminent les droits et obligations des parties dans le cadre de la vente en ligne de produits proposés par le vendeur. </p><p> Conditions Générales de Vente (CGV) s’appliquent à toutes les ventes de produits, effectuées au travers du site internet de la Société qui est partie intégrante du contrat entre l’acheteur et le vendeur. </p><p> Le vendeur se réserve la possibilité de modifier les présentes, à tout moment par la publication d’une nouvelle version sur son site internet. </p><p> Les CGV applicables alors sont celles étant en vigueur à la date du paiement (ou du premier paiement en cas de paiements multiples) de la commande </p><p> Ces CGV sont consultables sur le site internet de la Société à tout moment. L' acheteur déclare avoir pris connaissance de l’ensemble des présentes Conditions Générales de Vente liées à un produit ou à un service, et accepte sans restriction ni réserve </p><p> L'acheteur reconnaît qu’il a bénéficié des conseils et informations nécessaires afin de s’assurer de l’adéquation de l’offre à ses besoins. </p><p> L'acheteur déclare être en mesure de contracter légalement en vertu des lois françaises, représenter la personne physique ou morale pour laquelle il s’engage. </p>"
            }
        ]
    }

    return mentionLegales
})

//route api/page/legals