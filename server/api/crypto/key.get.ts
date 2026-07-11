export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  if (!config.cryptoSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Crypto secret key is not configured',
    })
  }

  return {
    key: config.cryptoSecretKey,
  }
})
