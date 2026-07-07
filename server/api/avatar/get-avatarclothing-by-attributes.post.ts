import { avatarMock } from '../../utils/avatarMock'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const topColorVariant = body.topColorVariant
    ? JSON.parse(body.topColorVariant)
    : null
  const bottomColorVariant = body.bottomColorVariant
    ? JSON.parse(body.bottomColorVariant)
    : null
  const outfitColorVariant = body.outfitColorVariant
    ? JSON.parse(body.outfitColorVariant)
    : null

  return {
    avatarClothing: [
      {
        id: 900,
        image: avatarMock.morphotypes[0].image,
        morphotype_id: body.morphotypeId,
        top_color_variant_id: topColorVariant?.id || null,
        bottom_color_variant_id: bottomColorVariant?.id || null,
        outfit_color_variant_id: outfitColorVariant?.id || null,
      },
    ],
  }
})
