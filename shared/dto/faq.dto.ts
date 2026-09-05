export interface FAQDTO {
    questions: Array<FAQBlockDTO>
}

export interface FAQBlockDTO {
    question: string
    answer: string
}
