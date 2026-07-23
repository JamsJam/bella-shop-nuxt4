<template>
  <div class="category">

   

    <div class="category_container">
      <div class="category_container_box">

        <div class="category_container_box_filter">
          <div class="category_container_box_filter_container">
            <FilterComponent v-for="(filter, index) in filters" :key="'filter_' + index" :label="filter.label"
              :filterItems="filter.filterItems" @filter-change="updateFilters($event)" />

            <button class="category_container_box_filter_container_apply_button" @click="applyFilters()">
              Appliquer les filtres
            </button>
          </div>
        </div>

        <div class="category_container_box_wrapper">
          <div class="category_container_box_clothes">
            <nuxt-link v-for="clothing in filteredClothes" 
              :key="'clothing_' + (clothing.id || clothing.slug)" 
              :to="{
                path: `/clothes/${clothing.slug}`,
              }" 
              class="category_container_box_clothes_card"
              >
              <div class="category_container_box_clothes_card_image">
                <img :src="currentImage(clothing)" :alt="clothing.name" />

                <template v-if="clothingImages(clothing).length > 1">
                  <button
                    type="button"
                    class="category_container_box_clothes_card_image_navigation category_container_box_clothes_card_image_navigation_previous"
                    :aria-label="`Image précédente de ${clothing.name}`"
                    @click.prevent.stop="changeImage(clothing, -1)"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    class="category_container_box_clothes_card_image_navigation category_container_box_clothes_card_image_navigation_next"
                    :aria-label="`Image suivante de ${clothing.name}`"
                    @click.prevent.stop="changeImage(clothing, 1)"
                  >
                    <span aria-hidden="true">›</span>
                  </button>

                  <div class="category_container_box_clothes_card_image_dots" aria-hidden="true">
                    <span
                      v-for="(_, imageIndex) in clothingImages(clothing)"
                      :key="imageIndex"
                      :class="{ active: currentImageIndex(clothing) === imageIndex }"
                    ></span>
                  </div>
                </template>
              </div>
              <div class="category_container_box_clothes_card_text">
                <p
                  v-if="clothing.price !== undefined && clothing.price !== null"
                  class="category_container_box_clothes_card_text_price"
                >
                  {{ formatPrice(clothing.price) }}
                </p>
                <p class="category_container_box_clothes_card_text_title">
                  {{ clothing.name }}
                </p>
              </div>
            </nuxt-link>
          </div>

          <div v-if="pageNumber === totalPages && filteredClothes.length > 1" class="category_container_box_pagination">
            <div class="category_container_box_pagination_no_more_products">
              <p>Vous avez vu tout les articles</p>
            </div>
          </div>

          <div v-if="filteredClothes.length === 0" class="category_container_box_pagination">
            <div class="category_container_box_pagination_no_more_products">
              <p>Nous n'avons pas trouvé de produit correspondant au filtres</p>
            </div>
          </div>

          <div v-if="pageNumber !== totalPages && filteredClothes.length > 1" class="category_container_box_pagination">
            <div class="category_container_box_pagination_container">
              <button v-if="pageNumber > totalPages" class="category_container_box_pagination_container_less_products"
                @click="handleClothesPage(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    d="m14.5 8.5l-4 4l-4-4" />
                </svg>
              </button>
              <div class="category_container_box_pagination_container_point" :class="{
                category_container_box_pagination_container_point_active:
                  pageNumber === 1,
              }"></div>
              <div class="category_container_box_pagination_container_point" :class="{
                category_container_box_pagination_container_point_active:
                  pageNumber !== 1 && pageNumber !== totalPages,
              }"></div>
              <div class="category_container_box_pagination_container_point" :class="{
                category_container_box_pagination_container_point_active:
                  pageNumber === totalPages && pageNumber !== 1,
              }"></div>
              <button v-if="pageNumber < totalPages" class="category_container_box_pagination_container_more_products"
                @click="handleClothesPage(1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    d="m14.5 8.5l-4 4l-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import ClothesCategoryHeader from '~/components/attachable/ClothesCategoryHeader.vue'

import FilterComponent from '~/components/category/filter/FilterComponent.vue'


export default {
  components: {
    FilterComponent,
    ClothesCategoryHeader,

  },
  props: {
    categoryData: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaderStatus: false,
      totalClothes: 0,
      itemsPerPage: 20,
      filters: [
        {
          label: 'Prix',
        },
        {
          label: 'Couleur',
          filterItems: [],
        },
        {
          label: 'Taille',
          filterItems: [],
        },
      ],
      filteredClothes: [],
      imageIndexes: {},
      appliedFilters: [],
      pageNumber: 1,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalClothes / this.itemsPerPage)
    },
  },
  watch: {
    categoryData(newData) {
      if (newData) {
        this.initializeFromCategoryData(newData)
      }
    },
  },
  async mounted() {
    this.loaderStatus = true
    if (this.categoryData) {
      this.initializeFromCategoryData(this.categoryData)
    }
  },
  methods: {
    clothingKey(clothing) {
      return String(clothing.id || clothing.slug)
    },

    clothingImages(clothing) {
      const images = Array.isArray(clothing.images)
        ? clothing.images.filter((image) => typeof image === 'string' && image.length > 0)
        : []

      return images.length > 0 ? images : (clothing.image ? [clothing.image] : [])
    },

    currentImageIndex(clothing) {
      return this.imageIndexes[this.clothingKey(clothing)] || 0
    },

    currentImage(clothing) {
      const images = this.clothingImages(clothing)
      return images[this.currentImageIndex(clothing)] || ''
    },

    changeImage(clothing, direction) {
      const images = this.clothingImages(clothing)
      if (images.length < 2) return

      const key = this.clothingKey(clothing)
      const nextIndex = (this.currentImageIndex(clothing) + direction + images.length) % images.length
      this.imageIndexes = { ...this.imageIndexes, [key]: nextIndex }
    },

    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(price / 100)
    },

    initializeFromCategoryData(data) {
      // Initialiser les vêtements depuis l'API
      if (data.clothes && Array.isArray(data.clothes)) {
        this.filteredClothes = data.clothes
        this.totalClothes = data.clothes.length
        this.imageIndexes = {}
      }

      // Initialiser les filtres depuis l'API
      if (data.filters && Array.isArray(data.filters)) {
        this.filters = data.filters.map((filter) => ({
          label: filter.label,
          filterItems: filter.values || [],
        }))
      }

      this.loaderStatus = false
    },

    async fetchClothesColorVariants() {
      try {
        const categoryId = this.$route.query.category_id
        const filtersQueryString = JSON.stringify(this.appliedFilters)
        const pageNumber = this.pageNumber

        const response = await fetch(
          `${this.$store.state.apiUrl}/clothes-color-variant/get-color-variants-by-category-and-page?categoryId=${categoryId}&filtersQueryString=${filtersQueryString}&pageNumber=${pageNumber}`
        )
        const data = await response.json()

        this.totalClothes = data.totalVariants

        if (data.variants.length > 0) {
          this.filteredClothes = data.variants.map((clothing) => {
            // Convertir sizes_variant_id en tableau d'entiers
            if (clothing.sizes_variant_id) {
              clothing.sizes_variant_id = JSON.parse(clothing.sizes_variant_id)
            }
            clothing.priceTTC = (clothing.price * 1.085).toFixed(2)
            clothing.calcultedPriceTTC = (
              this.calculatedPrice(clothing.price, clothing.promo) * 1.085
            ).toFixed(2)

            return clothing
          })
        } else {
          this.filteredClothes = []
        }

        this.loaderStatus = false
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des vêtements :",
          error
        )
      }
    },

    async fetchColors() {
      try {
        const response = await fetch(
          `${this.$store.state.apiUrl}/colors/get-all-colors`
        )
        const data = await response.json()
        // ici
        const couleurFilter = this.filters.find(
          (filter) => filter.label === 'Couleur'
        )
        if (couleurFilter) {
          couleurFilter.filterItems = data.colors
        } else {
          this.filters.push({
            label: 'Couleur',
            filterItems: data.colors,
          })
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des couleurs :",
          error
        )
      }
    },

    async fetchSizes() {
      try {
        const response = await fetch(
          `${this.$store.state.apiUrl}/sizes/get-all-sizes`
        )
        const data = await response.json()
        const tailleFilter = this.filters.find(
          (filter) => filter.label === 'Taille'
        )
        if (tailleFilter) {
          tailleFilter.filterItems = data.sizes
        } else {
          this.filters.push({
            label: 'Taille',
            filterItems: data.sizes
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des tailles :",
          error
        )
      }
    },

    async fetchPromotions() {
      try {
        const response = await fetch(
          `${this.$store.state.apiUrl}/clothes-color-variant/get-all-promotions`
        )
        const data = await response.json()

        if (response.ok) {
          this.filters.push({
            label: 'Promotions',
            filterItems: data.promotions,
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de la récupération des promotions :",
          error
        )
      }
    },

    calculatedPrice(price, promotion) {
      if (promotion && promotion > 0) {
        // Calculer le prix après la promotion
        const discountedPrice = price - price * (promotion / 100)
        return discountedPrice.toFixed(2) // Arrondir à 2 décimales
      } else {
        // Pas de promotion, retourner le prix normal
        return price.toFixed(2) // Arrondir à 2 décimales
      }
    },

    updateFilters(updatedFilter) {
      // Si les valeurs sont vides, supprimez le filtre correspondant dans appliedFilters
      if (updatedFilter.label !== 'Prix') {
        if (updatedFilter.values.length === 0) {
          const index = this.appliedFilters.findIndex(
            (filter) => filter.label === updatedFilter.label
          )
          if (index !== -1) {
            this.appliedFilters.splice(index, 1)
          }
        } else {
          // Sinon, mettez à jour ou ajoutez le filtre
          const index = this.appliedFilters.findIndex(
            (filter) => filter.label === updatedFilter.label
          )
          if (index === -1) {
            // Si le filtre avec le label donné n'est pas présent, ajoutez-le
            this.appliedFilters.push(updatedFilter)
          } else {
            // Si le filtre avec le label donné est déjà présent, mettez à jour ses valeurs
            this.appliedFilters[index].values = updatedFilter.values
          }
        }
      } else {
        // Pour le label "Prix", mettez à jour ou ajoutez le filtre Prix
        const index = this.appliedFilters.findIndex(
          (filter) => filter.label === 'Prix'
        )
        if (index === -1) {
          // Si le filtre "Prix" n'est pas présent, ajoutez-le avec les nouvelles valeurs
          this.appliedFilters.push({
            label: 'Prix',
            values: {
              minPrice: updatedFilter.values.minPrice,
              maxPrice: updatedFilter.values.maxPrice,
            },
          })
        } else {
          // Si le filtre "Prix" est déjà présent, mettez à jour ses valeurs
          this.appliedFilters[index].values = {
            minPrice: updatedFilter.values.minPrice,
            maxPrice: updatedFilter.values.maxPrice,
          }
        }
      }
    },

    async applyFilters() {
      const colorFilter = this.appliedFilters.find(
        (filter) => filter.label === 'Couleur'
      )
      const sizeFilter = this.appliedFilters.find(
        (filter) => filter.label === 'Taille'
      )
      const priceFilter = this.appliedFilters.find(
        (filter) => filter.label === 'Prix'
      )

      const minPrice = priceFilter?.values?.minPrice
      const maxPrice = priceFilter?.values?.maxPrice
      const price =
        minPrice !== undefined ||
        (maxPrice !== null && maxPrice !== undefined)
          ? [minPrice ?? 0, maxPrice ?? '']
          : undefined

      try {
        this.loaderStatus = true

        const clothes = await $fetch(
          `/api/search/${encodeURIComponent(this.$route.params.slug)}`,
          {
            query: {
              'color[]': colorFilter?.values?.length ? colorFilter.values : undefined,
              'size[]': sizeFilter?.values?.length ? sizeFilter.values : undefined,
              'price[]': price,
            },
          }
        )

        this.filteredClothes = Array.isArray(clothes) ? clothes : []
        this.totalClothes = this.filteredClothes.length
        this.imageIndexes = {}
        this.pageNumber = 1
      } catch (error) {
        console.error("Une erreur s'est produite lors du filtrage :", error)
      } finally {
        this.loaderStatus = false
      }
    },

    async handleClothesPage(count) {
      this.pageNumber = this.pageNumber + count

      await this.fetchClothesColorVariants()
    },
  },
}
</script>
