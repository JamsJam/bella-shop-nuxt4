import { getAvatarPartByColorPayload } from '../../../utils/avatarMock'

export default defineEventHandler(async (event) => {
  const part = getRouterParam(event, 'part')
  const query = getQuery(event)
  const colorId =
    query.colorId ||
    query.skinColorId ||
    query.haircolor_id ||
    query.eyeColorId ||
    query.eyebrowColorId ||
    query.mouthColorId

  if (!part) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing avatar part',
    })
  }

  return getAvatarPartByColorPayload(part, colorId, {
    morphologyId: query.morphologyId || query.morphology_id,
    accessoryId: query.accessoryId,
    accessoryOnly: query.accessoryOnly,
    faceVariant: query.faceVariant,
  })
})
