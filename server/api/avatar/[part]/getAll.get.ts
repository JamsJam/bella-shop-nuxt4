import { getAvatarPartPayload } from '../../../utils/avatarMock'

export default defineEventHandler(async (event) => {
  const part = getRouterParam(event, 'part')

  if (!part) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing avatar part',
    })
  }

  return getAvatarPartPayload(part)
})
