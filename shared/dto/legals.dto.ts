export interface LegalsDTO {
    LegalMentions: Array<LegalsBlockDTO>
    cgv: Array<LegalsBlockDTO>
}

export interface LegalsBlockDTO {
    title: string
    content: string
}


