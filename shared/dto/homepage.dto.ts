import type SeoPageDTO from './seopage.dto'


export interface HomepageLandingDTO {
    isFullscreen: boolean
    title: string
    subtitle: string
    text: string
    image: string
}

export interface HomepageAboutDTO {
    title: string
    text: string
}
export interface HomepageHighlightsDTO {
    products: Array<{
        id: number
        slug: string
        name: string
        price: number
        images: string
    }>
}
 export interface BestSellerProductDTO {
    id: number
    slug: string
    name: string
    price: number
    images: string
}

export interface HomepageBestsellerDTO {
    products: Array<BestSellerProductDTO>
}


export interface HomepageManualDTO {
    list: Array<{
        text: string
        image: string
    }>
}

export interface HomepageReturnDTO {
    steps: Array<{
        title: string
        icon: string
    }>
}

export interface HomepageSectionDTO {
    landing: HomepageLandingDTO
    about: HomepageAboutDTO
    bestseller: HomepageBestsellerDTO
    highlights: HomepageHighlightsDTO
    manual: HomepageManualDTO
    return: HomepageReturnDTO
}



export default interface HomepageDTO {
    sections: HomepageSectionDTO
    seo: SeoPageDTO
}
