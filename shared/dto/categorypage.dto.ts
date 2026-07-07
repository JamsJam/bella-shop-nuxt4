import type SeoPageDTO from './seopage.dto'
import type { BandeauDTO } from './bandeau.dto'
import type { CategoryListDTO } from './categorylist.dto'

export default interface CategoryPageDTO {
  seo: SeoPageDTO
  bandeau: BandeauDTO
  categories: CategoryListDTO[]
}
