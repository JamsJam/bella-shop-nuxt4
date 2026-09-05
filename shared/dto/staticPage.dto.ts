export interface StaticPageDTO {
    title: string
    blocks: Array<StaticBlockDTO>
}

export interface StaticBlockDTO {
    title?: string
    content: string
}
