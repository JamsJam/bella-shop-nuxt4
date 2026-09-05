import { createError, getRouterParam, readBody } from 'h3'
import type {
  ReviewBatchResponseDTO,
  ReviewSubmissionDTO,
  ReviewSubmissionResultDTO,
  ReviewStatus,
} from '#shared/dto/review.dto'

interface ReviewBatchBody {
  reviews?: ReviewSubmissionDTO[]
}

interface PlatformSubmissionResponse {
  reviewUuid?: string
  status?: ReviewStatus
  message?: string
}

interface PlatformReviewCollectionResponse {
  reviewUuid?: string
  reviews?: Array<{ reviewUuid?: string }>
}

const isUuid = (value: string) => /^[0-9a-f-]{36}$/i.test(value)

export default defineEventHandler(async (event): Promise<ReviewBatchResponseDTO> => {
  const pageUuid = getRouterParam(event, 'uuid')?.trim() || ''
  const body = await readBody<ReviewBatchBody>(event)
  const reviews = Array.isArray(body?.reviews) ? body.reviews : []
  const config = useRuntimeConfig(event)

  if (!isUuid(pageUuid) || reviews.length === 0) {
    throw createError({ statusCode: 422, statusMessage: 'Avis invalide.' })
  }

  const pageResponse = await $fetch.raw<PlatformReviewCollectionResponse>(
    `/reviews/${encodeURIComponent(pageUuid)}`,
    {
      baseURL: config.platformApiBase,
      method: 'GET',
      headers: { accept: 'application/json' },
      ignoreResponseError: true,
    }
  )

  if (pageResponse.status !== 200 || !pageResponse._data) {
    throw createError({ statusCode: 401, statusMessage: 'Avis introuvable.' })
  }

  const allowedReviewUuids = new Set(
    (pageResponse._data.reviews || [pageResponse._data])
      .map((review) => review.reviewUuid)
      .filter((reviewUuid): reviewUuid is string => Boolean(reviewUuid))
  )

  const normalizedReviews = reviews.map((review) => ({
    reviewUuid: String(review.reviewUuid || '').trim(),
    rating: Number(review.rating),
    comment: String(review.comment || '').trim(),
  }))

  if (
    normalizedReviews.some(
      (review) =>
        !isUuid(review.reviewUuid)
        || !allowedReviewUuids.has(review.reviewUuid)
        || !Number.isInteger(review.rating)
        || review.rating < 1
        || review.rating > 5
        || review.comment.length < 1
        || review.comment.length > 200
    )
  ) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Une note ou un commentaire est invalide.',
    })
  }

  const results: ReviewSubmissionResultDTO[] = []

  for (const review of normalizedReviews) {
    const response = await $fetch.raw<PlatformSubmissionResponse>(
      `/reviews/${encodeURIComponent(review.reviewUuid)}`,
      {
        baseURL: config.platformApiBase,
        method: 'POST',
        body: {
          rating: review.rating,
          comment: review.comment,
        },
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        ignoreResponseError: true,
      }
    )

    results.push({
      reviewUuid: review.reviewUuid,
      success: response.status >= 200 && response.status < 300,
      status: response._data?.status,
      message: response._data?.message,
    })
  }

  return { results }
})
