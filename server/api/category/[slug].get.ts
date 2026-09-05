import type CategoryDetailsDTO from '#shared/dto/categorydetails.dto'
import type { ClotheCarteDTO } from '#shared/dto/clotheCard.dto'

interface PlatformCategoryClotheDTO {
  name: string
  slug: string
  price: number
  image: string
  images: string[]
  colors: string[]
}

const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

const deslugify = (slug: string) =>
  slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())

export default defineEventHandler(async (event): Promise<CategoryDetailsDTO> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La catégorie est requise',
    })
  }

  const config = useRuntimeConfig(event)
  const APIPlatform = config.platformApiBase || 'http://localhost:8000'

  const platformClothes = await $fetch<PlatformCategoryClotheDTO[]>(
    `/category/${encodeURIComponent(slug)}`,
    {
      baseURL: APIPlatform,
      method: 'GET',
      query: getQuery(event),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const clothes: ClotheCarteDTO[] = platformClothes.map((clothe) => ({
    name: deslugify(clothe.slug),
    slug: clothe.slug,
    price: clothe.price,
    image: clothe.image,
    images: Array.isArray(clothe.images) ? clothe.images : [],
    colors: Array.isArray(clothe.colors) ? clothe.colors : [],
  }))

  const colors = [
    ...new Set(clothes.flatMap((clothe) => clothe.colors || [])),
  ]

  return {
    seo: {
      title: `Catégorie ${slug}`,
      description: `Découvrez les vêtements de la catégorie ${slug}.`,
      keywords: `${slug}, vêtements, mode, BellaGP`,
      ogTitle: `Catégorie ${slug}`,
      ogDescription: `Découvrez les vêtements de la catégorie ${slug}.`,
      ogUrl: `/category/${slug}`,
      ogImage: clothes[0]?.image || '',
      jsonLd: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Catégorie ${slug}`,
      }),
    },
    clothes,
    filters: [
      { label: 'Prix' },
      { label: 'Couleur', values: colors },
      { label: 'Taille', values: sizes },
    ],
  }
})
