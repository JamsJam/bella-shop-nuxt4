import { computed, toValue } from 'vue'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type {
  BreadcrumbItemDTO,
  BreadcrumbJsonLdDTO,
} from '#shared/dto/breadcrumb.dto'

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value)

const buildAbsoluteUrl = (path: string, baseUrl: string) => {
  if (isAbsoluteUrl(path)) return path

  try {
    return new URL(path, baseUrl).toString()
  } catch {
    return path
  }
}

export const useBreadcrumbJsonLd = (
  items: MaybeRefOrGetter<BreadcrumbItemDTO[]>,
  baseUrl?: MaybeRefOrGetter<string | undefined>
): ComputedRef<BreadcrumbJsonLdDTO | null> => {
  const siteConfig = useSiteConfig()

  return computed(() => {
    const resolvedItems = toValue(items) || []

    if (resolvedItems.length === 0) {
      return null
    }

    const resolvedBaseUrl = toValue(baseUrl) || siteConfig.url

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: resolvedItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: buildAbsoluteUrl(item.to, resolvedBaseUrl),
      })),
    }
  })
}
