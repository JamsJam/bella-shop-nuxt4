<template>
  <div class="review_page">
    <NavigationBar />

    <main class="review_page_main">
      <header class="review_page_header">
        <p class="review_page_eyebrow">Commande {{ reviewPage.orderReference }}</p>
        <h1>Votre avis compte</h1>
        <p>
          Partagez votre expérience pour chacun des articles reçus. Vos avis
          seront publiés après modération.
        </p>
      </header>

      <form class="review_page_form" @submit.prevent="submitReviews">
        <article
          v-for="review in reviewPage.reviews"
          :key="review.reviewUuid"
          class="review_page_card"
          :class="{
            'review_page_card--without-image': !review.product.image,
          }"
        >
          <div v-if="review.product.image" class="review_page_product_image">
            <img :src="review.product.image" :alt="review.product.name" />
          </div>

          <div class="review_page_card_content">
            <div class="review_page_product">
              <h2>{{ review.product.name }}</h2>
              <span
                v-if="review.status !== 'requested'"
                class="review_page_status"
              >
                {{ statusLabel(review.status) }}
              </span>
            </div>

            <template v-if="review.status === 'requested'">
              <fieldset class="review_page_rating">
                <legend>Votre note</legend>
                <div class="review_page_stars">
                  <label v-for="rating in 5" :key="rating">
                    <input
                      v-model.number="formFor(review.reviewUuid).rating"
                      type="radio"
                      :name="`rating-${review.reviewUuid}`"
                      :value="rating"
                      :aria-label="`${rating} étoile${rating > 1 ? 's' : ''}`"
                    />
                    <span
                      aria-hidden="true"
                      :class="{
                        'review_page_star--active':
                          rating <= formFor(review.reviewUuid).rating,
                      }"
                    >★</span>
                  </label>
                </div>
              </fieldset>

              <label
                class="review_page_comment"
                :for="`comment-${review.reviewUuid}`"
              >
                <span>Votre commentaire</span>
                <textarea
                  :id="`comment-${review.reviewUuid}`"
                  v-model="formFor(review.reviewUuid).comment"
                  maxlength="200"
                  rows="4"
                  placeholder="Qu’avez-vous pensé de cet article ?"
                  required
                />
                <small>
                  {{ formFor(review.reviewUuid).comment.length }}/200 caractères
                </small>
              </label>
            </template>

            <p v-else class="review_page_submitted">
              {{ submittedMessage(review.status) }}
            </p>
          </div>
        </article>

        <button
          v-if="hasRequestedReviews"
          type="submit"
          class="button--primary review_page_submit"
          :disabled="submitting"
        >
          {{ submitting ? 'Envoi en cours…' : submitLabel }}
        </button>
      </form>
    </main>

    <PopupComponent :popup_message="popupMessage" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type {
  ReviewBatchResponseDTO,
  ReviewPageDTO,
  ReviewStatus,
} from '#shared/dto/review.dto'
import NavigationBar from '~/components/attachable/NavigationBar.vue'
import PopupComponent from '~/components/attachable/PopupComponent.vue'
import Footer from '~/components/attachable/Footer.vue'

interface ReviewFormState {
  rating: number
  comment: string
}

const route = useRoute()
const uuid = String(route.params.uuid || '')
const popupMessage = ref<{ type: 'valid' | 'error'; message: string } | null>(null)
const submitting = ref(false)

const { data, error } = await useFetch<ReviewPageDTO>(
  `/api/reviews/${encodeURIComponent(uuid)}`
)

if (error.value || !data.value?.reviews?.length) {
  await navigateTo('/', { replace: true })
}

const reviewPage = reactive<ReviewPageDTO>(
  data.value || { orderReference: '', reviews: [] }
)
const forms = reactive<Record<string, ReviewFormState>>({})

function formFor(reviewUuid: string): ReviewFormState {
  const existingForm = forms[reviewUuid]

  if (existingForm) {
    return existingForm
  }

  const newForm = { rating: 0, comment: '' }
  forms[reviewUuid] = newForm
  return newForm
}

reviewPage.reviews.forEach((review) => {
  forms[review.reviewUuid] = {
    rating: review.rating || 0,
    comment: review.comment || '',
  }
})

const requestedReviews = computed(() =>
  reviewPage.reviews.filter((review) => review.status === 'requested')
)
const hasRequestedReviews = computed(() => requestedReviews.value.length > 0)
const submitLabel = computed(() =>
  requestedReviews.value.length > 1
    ? `Envoyer mes ${requestedReviews.value.length} avis`
    : 'Envoyer mon avis'
)

const statusLabel = (status: ReviewStatus) => ({
  requested: 'À compléter',
  pending: 'En cours de modération',
  accepted: 'Avis publié',
  rejected: 'Avis non publié',
}[status])

const submittedMessage = (status: ReviewStatus) => ({
  requested: '',
  pending: 'Merci, votre avis a bien été envoyé et sera bientôt examiné.',
  accepted: 'Votre avis a été accepté et publié.',
  rejected: 'Votre avis a été examiné mais ne sera pas publié.',
}[status])

async function submitReviews() {
  popupMessage.value = null

  const invalidReview = requestedReviews.value.find((review) => {
    const form = formFor(review.reviewUuid)
    return form.rating < 1
      || form.rating > 5
      || form.comment.trim().length < 1
      || form.comment.trim().length > 200
  })

  if (invalidReview) {
    popupMessage.value = {
      type: 'error',
      message: 'Choisissez une note et renseignez un commentaire pour chaque article.',
    }
    return
  }

  submitting.value = true

  try {
    const response = await $fetch<ReviewBatchResponseDTO>(
      `/api/reviews/${encodeURIComponent(uuid)}`,
      {
        method: 'POST',
        body: {
          reviews: requestedReviews.value.map((review) => ({
            reviewUuid: review.reviewUuid,
            rating: formFor(review.reviewUuid).rating,
            comment: formFor(review.reviewUuid).comment.trim(),
          })),
        },
      }
    )

    response.results.forEach((result) => {
      if (!result.success) return

      const review = reviewPage.reviews.find(
        (item) => item.reviewUuid === result.reviewUuid
      )

      if (review) {
        const form = formFor(review.reviewUuid)
        review.status = result.status || 'pending'
        review.rating = form.rating
        review.comment = form.comment.trim()
      }
    })

    const failedCount = response.results.filter((result) => !result.success).length

    popupMessage.value = failedCount === 0
      ? {
          type: 'valid',
          message: response.results.length > 1
            ? 'Merci, vos avis ont bien été envoyés.'
            : 'Merci, votre avis a bien été envoyé.',
        }
      : {
          type: 'error',
          message: 'Certains avis n’ont pas pu être envoyés. Vous pouvez réessayer.',
        }
  } catch {
    popupMessage.value = {
      type: 'error',
      message: 'Vos avis n’ont pas pu être envoyés. Veuillez réessayer.',
    }
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Donner mon avis | Bella',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
