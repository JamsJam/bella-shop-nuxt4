import type CategoryPageDTO from '#shared/dto/categorypage.dto'

export default defineEventHandler(async (): Promise<CategoryPageDTO> => {
    return {
        seo: {
            title: 'Nos catégories',
            description: 'Découvrez les différentes catégories de vêtements BellaGP.',
            keywords: 'mode, vêtements, catégories, BellaGP',
            ogTitle: 'Nos catégories — BellaGP',
            ogDescription: 'Parcourez les catégories de vêtements proposées par BellaGP.',
            ogUrl: 'https://www.bellagp.com/category',
            ogImage: '/images/logos/bella_logo.png',
            jsonLd: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'Nos catégories',
                description: 'Découvrez les différentes catégories de vêtements BellaGP.',
                url: 'https://www.bellagp.com/category',
            }),
        },
        bandeau: {
            title: 'Explore nos collections',
            cta: 'Commence ton shopping',
            background: 'https://picsum.photos/seed/bandeau/1200/400',
        },
        categories: [
            {
                name: 'Robes',
                slug: 'robes',
                image: 'https://picsum.photos/seed/robes/800/600',
            },
            {
                name: 'Tops',
                slug: 'tops',
                image: 'https://picsum.photos/seed/tops/800/600',
            },
            {
                name: 'Pantalons',
                slug: 'pantalons',
                image: 'https://picsum.photos/seed/pantalons/800/600',
            },
        ],
    }
})