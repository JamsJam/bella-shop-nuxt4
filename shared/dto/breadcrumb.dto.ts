export interface BreadcrumbItemDTO {
  label: string
  to: string
}

export interface BreadcrumbCategoryDTO {
  name: string
  slug: string
}

export interface BreadcrumbPageDataDTO {
  name?: string
  category?: BreadcrumbCategoryDTO | null
}

export interface BreadcrumbListItemDTO {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

export interface BreadcrumbJsonLdDTO {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItemDTO[]
}
