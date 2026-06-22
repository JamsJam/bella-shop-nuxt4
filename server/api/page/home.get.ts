import type HomepageDTO from '../../../shared/dto/homepage.dto'

export default defineEventHandler(async (): Promise<HomepageDTO> => {
  // Mock data - simulating the platform API response
  const homepage: HomepageDTO = {
    sections: {
      landing: {
        isFullscreen: true,
        title: 'Shop like Bella',
        subtitle: 'Un personnage à ton image',
        text: `Adepte du shopping en ligne ? Viens découvrir notre tout nouveau concept.<br>Un concept qui te permet de choisir tes vêtements et les essayer sur ton personnage.`,
        image: '/images/homepage/default_avatar_bella.png',
      },
      about: {
        title: 'Bella',
        text: `Nous proposons des vêtements pour diverses occasions. Une sortie entre copine, un brunch de dernière minute, une journée plage ou encore un dîner romantique, une de nos pièces pourrait certainement faire l'affaire.<br><br>Alors vis l'expérience Bella en créant un personnage à ton image pour voir le rendu de tes différents outfits. En fonction de ton mood du moment, sélectionne ce qui te plait et crée ton style.`,
      },
      bestseller: {
        products: [
          {
            id: 1,
            slug: 'robe-soiree-1',
            name: 'Robe de Soirée Élégante',
            price: 129.99,
            images: 'https://picsum.photos/300/400?random=1',
          },
          {
            id: 2,
            slug: 'robe-soiree-2',
            name: 'Robe Cocktail Chic',
            price: 89.99,
            images: 'https://picsum.photos/300/400?random=2',
          },
          {
            id: 3,
            slug: 'robe-soiree-3',
            name: 'Robe Fluide Premium',
            price: 109.99,
            images: 'https://picsum.photos/300/400?random=3',
          },
          {
            id: 4,
            slug: 'robe-soiree-4',
            name: 'Robe Soirée Exclusive',
            price: 149.99,
            images: 'https://picsum.photos/300/400?random=4',
          },
        ],
      },
      highlights: {
        products: [
          {
            id: 5,
            slug: 'highlight-1',
            name: 'Collection Printemps',
            price: 79.99,
            images: 'https://picsum.photos/300/400?random=5',
          },
          {
            id: 6,
            slug: 'highlight-2',
            name: 'Ensemble Casual',
            price: 99.99,
            images: 'https://picsum.photos/300/400?random=6',
          },
          {
            id: 7,
            slug: 'highlight-3',
            name: 'Tenue Tendance',
            price: 119.99,
            images: 'https://picsum.photos/300/400?random=7',
          },
          {
            id: 8,
            slug: 'highlight-4',
            name: 'Look du Moment',
            price: 139.99,
            images: 'https://picsum.photos/300/400?random=8',
          },
        ],
      },
      manual: {
        list: [
          {
            text: 'Étape 1: Sélectionnez vos vêtements',
            image: 'https://picsum.photos/200/200?random=9',
          },
          {
            text: 'Étape 2: Ajoutez au panier',
            image: 'https://picsum.photos/200/200?random=10',
          },
          {
            text: 'Étape 3: Procédez au paiement',
            image: 'https://picsum.photos/200/200?random=11',
          },
          {
            text: 'Étape 4: Confirmez votre commande',
            image: 'https://picsum.photos/200/200?random=12',
          },
        ],
      },
      return: {
        steps: [
          {
            title: 'Retours faciles',
            icon: 'https://picsum.photos/64/64?random=13',
          },
          {
            title: 'Service client 24/7',
            icon: 'https://picsum.photos/64/64?random=14',
          },
          {
            title: 'Livraison gratuite',
            icon: 'https://picsum.photos/64/64?random=15',
          },
          {
            title: 'Paiement sécurisé',
            icon: 'https://picsum.photos/64/64?random=16',
          }
        ],
      },
    },
    seo: {
      title: 'BellaGP — Mode italienne exclusive',
      description: 'Découvrez la collection BellaGP : vêtements chics et modernes pour un style unique.',
      keywords: 'mode, vêtements, BellaGP, robe, tenue, livraison, retour, shopping',
      ogTitle: 'BellaGP | Collection italienne exclusive',
      ogDescription: 'Explore les dernières pièces BellaGP et crée ton look avec style.',
      ogUrl: 'https://www.bellagp.com',
      ogImage: 'https://picsum.photos/1200/630?grayscale',
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "BellaGP - Mode italienne exclusive",
        "description": "Découvrez la collection BellaGP : vêtements chics et modernes pour un style unique.",
        "url": "https://www.bellagp.com",
        "image": "https://picsum.photos/1200/630?grayscale"
      })
    },
  }

  return homepage
})
