interface PlatformVariantStockDTO {
  variantId: number
  stock: number
  available: boolean
}

export default defineEventHandler(async (event): Promise<PlatformVariantStockDTO> => {
  const id = getRouterParam(event, 'id')
  const variantId = Number(id)

  if (!Number.isInteger(variantId) || variantId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La déclinaison est invalide',
    })
  }

  const config = useRuntimeConfig(event)
  const apiUrl = config.platformApiBase

  if (!apiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Api Base is not configured',
    })
  }

  return await $fetch<PlatformVariantStockDTO>(
    `/variants/${variantId}/stock`,
    {
      baseURL: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )
})
