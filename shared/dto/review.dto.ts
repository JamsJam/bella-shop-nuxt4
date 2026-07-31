export type ReviewStatus = 'requested' | 'pending' | 'accepted' | 'rejected'

export interface ReviewProductDTO {
  id: number
  name: string
  slug?: string
  image?: string | null
  images?: string[]
}

export interface ReviewItemDTO {
  reviewUuid: string
  product: ReviewProductDTO
  orderReference: string
  status: ReviewStatus
  rating: number | null
  comment: string | null
}

export interface ReviewPageDTO {
  orderReference: string
  reviews: ReviewItemDTO[]
}

export interface ReviewSubmissionDTO {
  reviewUuid: string
  rating: number
  comment: string
}

export interface ReviewSubmissionResultDTO {
  reviewUuid: string
  success: boolean
  status?: ReviewStatus
  message?: string
}

export interface ReviewBatchResponseDTO {
  results: ReviewSubmissionResultDTO[]
}
