import { computed, toValue } from 'vue'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type {
  BreadcrumbItemDTO,
  BreadcrumbPageDataDTO,
} from '#shared/dto/breadcrumb.dto'

const standalonePages: Record<string, string> = {
  about: 'À propos',
  account: 'Mon compte',
  avatar: 'Avatar',
  cart: 'Panier',
  confidentiality: 'Confidentialité',
  confirm: 'Confirmation de commande',
  contact: 'Contact',
  delivery: 'Livraison',
  expedition: 'Livraison',
  faq: 'FAQ',
  legals: 'Mentions légales',
  returns: 'Retours',
  sav: 'Service après-vente',
}

const homeItem: BreadcrumbItemDTO = {
  label: 'Accueil',
  to: '/',
}

export const useBreadcrumbItems = (
  route: RouteLocationNormalizedLoaded,
  pageData?: MaybeRefOrGetter<BreadcrumbPageDataDTO | null | undefined>
): ComputedRef<BreadcrumbItemDTO[]> =>
  computed(() => {
    const segments = route.path
      ?.toString()
      .split('/')
      .map((segment) => decodeURIComponent(segment).trim())
      .filter(Boolean)
    const data = toValue(pageData)

    if (!segments || segments.length === 0) {
      return []
    }

    const [rootSegment, slugSegment] = segments

    if (!rootSegment) {
      return []
    }

    if (rootSegment === 'category') {
      const items: BreadcrumbItemDTO[] = [
        homeItem,
        { label: 'Catégories', to: '/category' },
      ]

      if (segments.length === 2 && slugSegment && data?.name) {
        items.push({
          label: data.name,
          to: `/category/${encodeURIComponent(slugSegment)}`,
        })
      }

      return items
    }

    if (rootSegment === 'clothes' && segments.length === 2) {
      if (
        !slugSegment
        || !data?.name
        || !data.category?.name
        || !data.category.slug
      ) {
        return []
      }

      return [
        homeItem,
        { label: 'Catégories', to: '/category' },
        {
          label: data.category.name,
          to: `/category/${encodeURIComponent(data.category.slug)}`,
        },
        {
          label: data.name,
          to: `/clothes/${encodeURIComponent(slugSegment)}`,
        },
      ]
    }

    const standalonePageLabel = standalonePages[rootSegment]

    if (segments.length === 1 && standalonePageLabel) {
      return [
        homeItem,
        {
          label: standalonePageLabel,
          to: `/${rootSegment}`,
        },
      ]
    }

    return []
  })
