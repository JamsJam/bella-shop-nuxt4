import type ClotheDetailsDTO from '#shared/dto/clotheDetails.dto'

interface PlatformMeasurementDTO {
  code: string
  label: string
  value: string
  unit: string
}

interface PlatformSizeGuideSizeDTO {
  label: string
  measurements: PlatformMeasurementDTO[]
}

interface PlatformSizeGuideDTO {
  unit: string
  sizes: PlatformSizeGuideSizeDTO[]
}

interface PlatformSizeDTO {
  id: number
  name: string
}

interface PlatformColorDTO {
  name: string
  slug: string
  hexa: string | null
}

interface PlatformClothesVariantItemDTO {
  slug: string
  name: string
  color: string
  hexa?: string | null
}

interface PlatformClothesVariantDTO {
  name: string
  variants: PlatformClothesVariantItemDTO[]
}

interface PlatformRelatedProductDTO {
  name: string
  slug: string
  image: string | null
  images: string[]
}

interface PlatformCategoryDTO {
  name: string
  slug: string
}

interface PlatformVariantDTO {
  name: string
  slug: string
  price: number
  description: string | null
  metadescription: string | null
  category: PlatformCategoryDTO
  clothesVariant: PlatformClothesVariantDTO
  image: string | null
  images: string[]
  sizes: PlatformSizeDTO[]
  sizeGuide: PlatformSizeGuideDTO | null
  colors: PlatformColorDTO[]
  relatedProducts: PlatformRelatedProductDTO[]
}

const deslugify = (slug: string) =>
  slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())

const normalizeHex = (hexa: string | null) => {
  if (!hexa) {
    return '#cccccc'
  }

  return `#${hexa.replace(/^#/, '')}`
}

const mapSizeGuide = (guide: PlatformSizeGuideDTO | null): ClotheDetailsDTO['sizeGuide'] => {
  if (!guide) {
    return { title: 'Guide des tailles', columns: [], rows: [] }
  }

  const measurementColumns = new Map<string, string>()

  for (const size of guide.sizes) {
    for (const measurement of size.measurements) {
      measurementColumns.set(measurement.code, measurement.label)
    }
  }

  return {
    title: 'Guide des tailles',
    columns: [
      { key: 'size', label: 'Taille' },
      ...Array.from(measurementColumns, ([key, label]) => ({ key, label })),
    ],
    rows: guide.sizes.map((size) => {
      const row: Record<string, string> = { size: size.label }

      for (const measurement of size.measurements) {
        const unit = measurement.unit || guide.unit
        row[measurement.code] = `${measurement.value}${unit ? ` ${unit}` : ''}`
      }

      return row
    }),
  }
}

const mapColors = (variant: PlatformVariantDTO): ClotheDetailsDTO['colors'] => {
  const colorsBySlug = new Map(
    (Array.isArray(variant.colors) ? variant.colors : []).map((color) => [color.slug, color])
  )
  const clothesVariants = Array.isArray(variant.clothesVariant?.variants)
    ? variant.clothesVariant.variants
    : []

  if (clothesVariants.length > 0) {
    return clothesVariants.map((clotheVariant) => {
      const color = colorsBySlug.get(clotheVariant.slug)

      return {
        name: clotheVariant.color || color?.name || '',
        slug: clotheVariant.slug,
        hex: normalizeHex(clotheVariant.hexa ?? color?.hexa ?? null),
        href: `/clothes/${clotheVariant.slug}`,
      }
    })
  }

  return Array.from(colorsBySlug.values(), (color) => ({
    name: color.name,
    slug: color.slug,
    hex: normalizeHex(color.hexa),
    href: `/clothes/${color.slug}`,
  }))
}

export default defineEventHandler(async (event): Promise<ClotheDetailsDTO> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le slug du vêtement est requis',
    })
  }

  const config = useRuntimeConfig(event)
  const APIPlatform = config.platformApiBase || 'http://localhost:8000'
  const variant = await $fetch<PlatformVariantDTO>(
    `/variant/${encodeURIComponent(slug)}`,
    {
      baseURL: APIPlatform,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const imageUrls = [variant.image, ...(Array.isArray(variant.images) ? variant.images : [])]
    .filter((image): image is string => typeof image === 'string' && image.length > 0)
    .filter((image, index, images) => images.indexOf(image) === index)
  const variantName = deslugify(variant.slug)

  return {
    name: variantName,
    slug: variant.slug,
    price: variant.price / 100,
    description: variant.description || '',
    metadescription: variant.metadescription || '',
    category: {
      name: variant.category.name,
      slug: variant.category.slug,
    },
    images: imageUrls.map((src, index) => ({
      id: index + 1,
      src,
      alt: `${variantName} - image ${index + 1}`,
    })),
    sizes: (Array.isArray(variant.sizes) ? variant.sizes : []).map((size) => ({
      id: size.id,
      name: size.name,
    })),
    sizeGuide: mapSizeGuide(variant.sizeGuide),
    colors: mapColors(variant),
    relatedClothes: (Array.isArray(variant.relatedProducts) ? variant.relatedProducts : []).map((clothe) => ({
      name: deslugify(clothe.slug),
      slug: clothe.slug,
      image: clothe.image || undefined,
      images: Array.isArray(clothe.images) ? clothe.images : [],
    })),
  }
})
