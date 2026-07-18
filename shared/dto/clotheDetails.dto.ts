import type { ClotheCarteDTO } from './clotheCard.dto'

export interface ClotheImageDTO {
  id: number
  src: string
  alt: string
}

export interface ClotheColorDTO {
  id?: number
  variantId?: number
  slug: string
  name: string
  hex: string
  href: string
}

export interface ClotheSizeDTO {
  id: number
  name: string
}

export interface ClotheSizeGuideColumnDTO {
  key: string
  label: string
}

export interface ClotheSizeGuideDTO {
  title: string
  columns: ClotheSizeGuideColumnDTO[]
  rows: Array<Record<string, string>>
}

export interface ClotheCategoryDTO {
  name: string
  slug: string
}

export default interface ClotheDetailsDTO {
  id?: number
  slug: string
  name: string
  price: number
  description: string
  metadescription: string
  category: ClotheCategoryDTO
  images: ClotheImageDTO[]
  colors: ClotheColorDTO[]
  sizes: ClotheSizeDTO[]
  sizeGuide: ClotheSizeGuideDTO
  relatedClothes: ClotheCarteDTO[]
}
