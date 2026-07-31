import { createError, getRouterParam } from 'h3'
import type {
  ReviewItemDTO,
  ReviewPageDTO,
  ReviewStatus,
} from '#shared/dto/review.dto'

interface PlatformReviewResponse extends Partial<ReviewItemDTO> {
  reviews?: ReviewItemDTO[]
}

const reviewStatuses: ReviewStatus[] = [
  'requested',
  'pending',
  'accepted',
  'rejected',
]

const isReview = (review: Partial<ReviewItemDTO>): review is ReviewItemDTO =>
  typeof review.reviewUuid === 'string'
  && review.reviewUuid !== ''
  && typeof review.orderReference === 'string'
  && review.orderReference !== ''
  && typeof review.product?.id === 'number'
  && typeof review.product?.name === 'string'
  && reviewStatuses.includes(review.status as ReviewStatus)

export default defineEventHandler(async (event): Promise<ReviewPageDTO> => {
  const uuid = getRouterParam(event, 'uuid')?.trim()
  const config = useRuntimeConfig(event)

  if (!uuid || !/^[0-9a-f-]{36}$/i.test(uuid)) {
    throw createError({ statusCode: 401, statusMessage: 'Avis introuvable.' })
  }

  const response = await $fetch.raw<PlatformReviewResponse>(
    `/reviews/${encodeURIComponent(uuid)}`,
    {
      baseURL: config.platformApiBase,
      method: 'GET',
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  if (response.status !== 200 || !response._data) {
    throw createError({ statusCode: 401, statusMessage: 'Avis introuvable.' })
  }

  const candidates = Array.isArray(response._data.reviews)
    ? response._data.reviews
    : [response._data]
  const reviews = candidates.filter(isReview)

  if (reviews.length === 0) {
    throw createError({ statusCode: 401, statusMessage: 'Avis introuvable.' })
  }

  const [firstReview] = reviews

  if (!firstReview) {
    throw createError({ statusCode: 401, statusMessage: 'Avis introuvable.' })
  }

  return {
    orderReference: firstReview.orderReference,
    reviews,
  }
})
