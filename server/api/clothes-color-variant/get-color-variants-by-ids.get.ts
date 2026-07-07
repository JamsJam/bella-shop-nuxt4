import { avatarMock } from '../../utils/avatarMock'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const variantIds = Array.isArray(query.variantIds)
    ? query.variantIds[0]
    : query.variantIds
  const ids = variantIds ? JSON.parse(String(variantIds)) : []

  return {
    variants: avatarMock.clothes.filter((clothing) => ids.includes(clothing.id)),
  }
})
