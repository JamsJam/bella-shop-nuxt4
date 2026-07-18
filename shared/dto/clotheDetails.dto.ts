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
  id: string
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

export default interface ClotheDetailsDTO {
  id?: number
  slug: string
  name: string
  price: number
  description: string
  metadescription: string
  images: ClotheImageDTO[]
  colors: ClotheColorDTO[]
  sizes: ClotheSizeDTO[]
  sizeGuide: ClotheSizeGuideDTO
  relatedClothes: ClotheCarteDTO[]
}
