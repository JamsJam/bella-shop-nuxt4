interface ProductImageDTO {
  id: number
  src: string
  alt: string
}

interface ProductColorDTO {
  id: number
  variantId: number
  name: string
  hex: string
}

interface ProductSizeDTO {
  id: string
  name: string
}

interface ProductSizeGuideDTO {
  title: string
  columns: Array<{
    key: string
    label: string
  }>
  rows: Array<Record<string, string>>
}

interface ProductPageDTO {
  id: number
  slug: string
  name: string
  price: number
  description: string
  images: ProductImageDTO[]
  colors: ProductColorDTO[]
  sizes: ProductSizeDTO[]
  sizeGuide: ProductSizeGuideDTO
}

const deslugifyProductName = (slug = '') =>
  slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())

export default defineEventHandler((event): ProductPageDTO => {
  const slug = getRouterParam(event, 'slug') || 'vetement'
  const name = deslugifyProductName(slug)

  return {
    id: 1,
    slug,
    name,
    price: 79.9,
    description:
      'Une pièce pensée pour compléter votre dressing BellaGP avec une coupe confortable, une finition soignée et un style facile à porter au quotidien.',
    images: [
      {
        id: 1,
        src: '/images/clothes/category_banniere.jpg',
        alt: `${name} vue principale`,
      },
      {
        id: 2,
        src: '/images/clothes/login_image.png',
        alt: `${name} vue detail`,
      },
      {
        id: 3,
        src: '/images/clothes/signin_image.png',
        alt: `${name} vue portee`,
      },
      {
        id: 4,
        src: '/images/homepage/best-seller-arriere-plan.jpg',
        alt: `${name} ambiance`,
      },
    ],
    colors: [
      { id: 1, variantId: 101, name: 'Noir', hex: '#111111' },
      { id: 2, variantId: 102, name: 'Blanc', hex: '#f4f4f4' },
      { id: 3, variantId: 103, name: 'Rose', hex: '#e9a4b6' },
      { id: 4, variantId: 104, name: 'Vert', hex: '#276f45' },
    ],
    sizes: [
      { id: 'xs', name: 'XS' },
      { id: 's', name: 'S' },
      { id: 'm', name: 'M' },
      { id: 'l', name: 'L' },
      { id: 'xl', name: 'XL' },
    ],
    sizeGuide: {
      title: 'Guide des tailles',
      columns: [
        { key: 'size', label: 'Taille' },
        { key: 'chest', label: 'Poitrine' },
        { key: 'waist', label: 'Taille' },
        { key: 'hips', label: 'Hanches' },
        { key: 'length', label: 'Longueur' },
      ],
      rows: [
        { size: 'XS', chest: '78-84 cm', waist: '60-66 cm', hips: '86-90 cm', length: '58 cm' },
        { size: 'S', chest: '84-90 cm', waist: '66-72 cm', hips: '90-96 cm', length: '60 cm' },
        { size: 'M', chest: '90-96 cm', waist: '72-78 cm', hips: '96-102 cm', length: '62 cm' },
        { size: 'L', chest: '96-104 cm', waist: '78-86 cm', hips: '102-110 cm', length: '64 cm' },
        { size: 'XL', chest: '104-112 cm', waist: '86-94 cm', hips: '110-118 cm', length: '66 cm' },
      ],
    },
  }
})
