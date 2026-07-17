import type { ClotheCarteDTO } from '#shared/dto/clotheCard.dto'

interface PlatformSearchClotheDTO {
  name: string
  slug: string
  image?: string | null
  images?: string[]
  colors?: string[]
  price?: number
}

export default defineEventHandler(async (event): Promise<ClotheCarteDTO[]> => {
  const category = getRouterParam(event, 'category')

  if (!category) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La catégorie est requise',
    })
  }

  const config = useRuntimeConfig(event)
  const APIPlatform = config.platformApiBase || 'http://localhost:8000'

  const platformClothes = await $fetch<PlatformSearchClotheDTO[]>(
    `/api/search/${encodeURIComponent(category)}`,
    {
      baseURL: APIPlatform,
      method: 'GET',
      query: getQuery(event),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return platformClothes.map((clothe) => ({
    name: clothe.name,
    slug: clothe.slug,
    image: clothe.image || undefined,
    images: Array.isArray(clothe.images) ? clothe.images : [],
    colors: Array.isArray(clothe.colors) ? clothe.colors : [],
    price: clothe.price,
  }))
})
