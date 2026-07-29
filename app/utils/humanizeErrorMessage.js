const technicalMessagePattern =
  /(?:failed to fetch|fetch failed|network error|request failed|internal server error|unexpected token|stack trace|status code|not configured|traceback|something went wrong|an error occurred|unable to|could not|cannot|\/api\/|https?:\/\/|\b(?:sql|jwt|json|cors|stripe|api|http|token|serveur|server|route|exception|undefined|null)\b|\b[45]\d{2}\b)/i

const knownMessages = [
  {
    pattern: /(?:invalid|bad) credentials/i,
    message: 'Adresse e-mail ou mot de passe incorrect.',
  },
  {
    pattern: /too many requests|rate limit/i,
    message: 'Trop de tentatives ont été effectuées. Veuillez patienter quelques instants.',
  },
  {
    pattern: /(?:invalid|expired).*(?:code|token)|(?:code|token).*(?:invalid|expired)/i,
    message: 'Le code renseigné est invalide ou a expiré.',
  },
  {
    pattern: /user not found|customer not found/i,
    message: 'Aucun compte ne correspond aux informations renseignées.',
  },
  {
    pattern: /e-?mail.*(?:already|exist|used)|(?:already|exist|used).*e-?mail/i,
    message: 'Cette adresse e-mail est déjà associée à un compte.',
  },
  {
    pattern: /authentication request could not be processed/i,
    message: 'La connexion est momentanément indisponible. Veuillez réessayer.',
  },
  {
    pattern: /jwt.*expired|expired.*jwt|token.*expired/i,
    message: 'Votre session a expiré. Veuillez vous reconnecter.',
  },
  {
    pattern: /access denied|forbidden/i,
    message: 'Vous n’êtes pas autorisé à effectuer cette action.',
  },
  {
    pattern: /not acceptable/i,
    message: 'La demande n’a pas pu être traitée. Veuillez réessayer.',
  },
  {
    pattern: /insufficient.*stock|not enough.*stock/i,
    message: 'Le stock disponible ne permet pas de valider cette quantité.',
  },
  {
    pattern: /cart.*empty|empty.*cart/i,
    message: 'Votre panier est vide.',
  },
]

const extractMessage = (error) => {
  if (typeof error === 'string') return error
  if (Array.isArray(error)) return extractMessage(error[0])

  return (
    error?.data?.error ||
    error?.data?.message ||
    error?.statusMessage ||
    error?.error ||
    error?.message ||
    ''
  )
}

export const humanizeErrorMessage = (
  error,
  fallback = 'Une erreur est survenue. Veuillez réessayer.'
) => {
  const comesFromApi = Boolean(
    error?.data ||
      error?.response ||
      error?.statusCode ||
      error?.status ||
      error?.statusMessage
  )
  const extractedMessage = extractMessage(error)
  const message =
    typeof extractedMessage === 'string' ? extractedMessage.trim() : ''

  if (!message || message === '[object Object]') return fallback

  const knownMessage = knownMessages.find(({ pattern }) => pattern.test(message))
  if (knownMessage) return knownMessage.message

  if (
    technicalMessagePattern.test(message) ||
    /<[^>]+>/.test(message) ||
    message.length > 180 ||
    (comesFromApi && !knownMessage)
  ) {
    return fallback
  }

  return /[.!?]$/.test(message) ? message : `${message}.`
}
