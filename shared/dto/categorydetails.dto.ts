import type { ClotheCarteDTO } from './clotheCard.dto'
import type SeoPageDTO from './seopage.dto'

export interface CategoryFilterDTO {
  label: 'Prix' | 'Couleur' | 'Taille'
  values?: string[]
}

export default interface CategoryDetailsDTO {
  seo: SeoPageDTO
  clothes: ClotheCarteDTO[]
  filters: CategoryFilterDTO[]
}
