import type CategoryPageDTO from '#shared/dto/categorypage.dto'

interface PlatformClotheDTO {
  name: string
  slug: string
  image?: string
  images?: string[]
}

const toSitemapImages = (sources: Array<string | undefined>, title: string) =>
  Array.from(new Set(sources.filter((source): source is string => Boolean(source))))
    .map((loc) => ({ loc, title }))

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const platformApiBase = config.platformApiBase || 'http://localhost:8000'

  const categoryPage = await $fetch<CategoryPageDTO>('/page/categories', {
    baseURL: platformApiBase,
    headers: {
      Accept: 'application/json',
    },
  })

  const categories = categoryPage.categories.filter((category) => category.slug)
  const clothesByCategory = await Promise.all(
    categories.map((category) =>
      $fetch<PlatformClotheDTO[]>(
        `/category/${encodeURIComponent(category.slug)}`,
        {
          baseURL: platformApiBase,
          headers: {
            Accept: 'application/json',
          },
        }
      )
    )
  )

  const clothes = new Map(
    clothesByCategory
      .flat()
      .filter((clothe) => clothe.slug)
      .map((clothe) => [clothe.slug, clothe])
  )

  return [
    ...categories.map((category) => ({
      loc: `/category/${encodeURIComponent(category.slug)}`,
      images: toSitemapImages([category.image], category.name),
    })),
    ...Array.from(clothes.values(), (clothe) => ({
      loc: `/clothes/${encodeURIComponent(clothe.slug)}`,
      images: toSitemapImages(
        [clothe.image, ...(clothe.images || [])],
        clothe.name
      ),
    })),
  ]
})
