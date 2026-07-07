import type { ClotheCarteDTO } from '#shared/dto/clotheCard.dto'
import type SeoPageDTO from '#shared/dto/seopage.dto'

interface CategoryPageDataDTO {
  seo: SeoPageDTO
  clothes: ClotheCarteDTO[]
  filters: Array<{
    label: string
    values?: string[]
  }>
}

export default defineEventHandler(async (event): Promise<CategoryPageDataDTO> => {
  const slug = getRouterParam(event, 'slug')

  const clothes: ClotheCarteDTO[] = [
    {
      name: 'Robe élégante',
      image: 'https://picsum.photos/seed/robe/800/600',
      slug: 'robe-elegante',
      price: 89,
    },
    {
      name: 'T-shirt basique',
      image: 'https://picsum.photos/seed/tshirt/800/600',
      slug: 't-shirt-basique',
      price: 29,
    },
    {
      name: 'Pantalon chic',
      image: 'https://picsum.photos/seed/pantalon/800/600',
      slug: 'pantalon-chic',
      price: 59,
    },
  ]

  const formattedClothes = slug
    ? clothes.map((item) => ({
        ...item,
        slug: `${slug}-${item.slug}`,
      }))
    : clothes

  return {
    seo: {
      title: slug ? `Catégorie ${slug}` : 'Catégorie',
      description: 'Découvrez nos vêtements disponibles pour cette catégorie.',
      keywords: 'mode, vêtements, catégorie, BellaGP',
      ogTitle: slug ? `Catégorie ${slug}` : 'Catégorie',
      ogDescription: 'Découvrez nos vêtements disponibles pour cette catégorie.',
      ogUrl: slug ? `https://www.bellagp.com/category/${slug}` : 'https://www.bellagp.com/category',
      ogImage: '/images/logos/bella_logo.png',
      jsonLd: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: slug ? `Catégorie ${slug}` : 'Catégorie',
        description: 'Découvrez nos vêtements disponibles pour cette catégorie.',
      }),
    },
    clothes: formattedClothes,
    filters: [
      { label: 'Prix' },
      { label: 'Couleur', values: ['Noir', 'Blanc', 'Rouge'] },
      { label: 'Taille', values: ['S', 'M', 'L', 'XL'] },
    ],
  }
})
