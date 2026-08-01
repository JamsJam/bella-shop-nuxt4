<template>
  <section class="product_reviews" aria-labelledby="product-reviews-title">
    <div class="product_reviews_header">
      <div>
        <p class="product_reviews_eyebrow">Avis clients</p>
        <h2 id="product-reviews-title">Ce qu’ils en pensent</h2>
      </div>

      <div
        v-if="reviews.length"
        class="product_reviews_summary"
        :aria-label="`${averageRating} sur 5, calculé à partir de ${reviewCountLabel}`"
      >
        <strong>{{ averageRating }}</strong>
        <span class="product_reviews_summary_stars" aria-hidden="true">
          <span
            v-for="star in 5"
            :key="star"
            :class="{ 'product_reviews_star--active': star <= roundedAverage }"
          >★</span>
        </span>
        <span>{{ reviewCountLabel }}</span>
      </div>
    </div>

    <p v-if="!reviews.length" class="product_reviews_empty">
      Aucun avis pour le moment.
    </p>

    <div v-else class="product_reviews_list">
      <article
        v-for="(review, index) in reviews"
        :key="`${review.createdAt}-${index}`"
        class="product_reviews_card"
      >
        <header class="product_reviews_card_header">
          <div>
            <p class="product_reviews_author">Avis client</p>
            <p
              class="product_reviews_stars"
              :aria-label="`${review.rating} étoile${review.rating > 1 ? 's' : ''} sur 5`"
            >
              <span
                v-for="star in 5"
                :key="star"
                aria-hidden="true"
                :class="{ 'product_reviews_star--active': star <= review.rating }"
              >★</span>
            </p>
          </div>
          <time :datetime="review.createdAt">{{ formatDate(review.createdAt) }}</time>
        </header>

        <p class="product_reviews_comment">{{ review.comment }}</p>

        <div v-if="review.reply" class="product_reviews_reply">
          <p class="product_reviews_reply_title">Réponse de Bella</p>
          <p>{{ review.reply }}</p>
          <time v-if="review.repliedAt" :datetime="review.repliedAt">
            {{ formatDate(review.repliedAt) }}
          </time>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ClotheReviewDTO } from '#shared/dto/clotheDetails.dto'

const props = withDefaults(defineProps<{
  reviews?: ClotheReviewDTO[]
}>(), {
  reviews: () => [],
})

const averageRating = computed(() => {
  if (!props.reviews.length) return '0,0'

  const average = props.reviews.reduce((sum, review) => sum + review.rating, 0)
    / props.reviews.length

  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(average)
})

const roundedAverage = computed(() => {
  if (!props.reviews.length) return 0

  return Math.round(
    props.reviews.reduce((sum, review) => sum + review.rating, 0)
      / props.reviews.length
  )
})

const reviewCountLabel = computed(() =>
  `${props.reviews.length} avis`
)

const formatDate = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return ''

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate)
}
</script>
