export function toLowerCase(text) {
  return text.toLowerCase()
}

// Formater le nom | Transformer la première lettre en majuscule
export function formatName(name) {
  if (name && name.length > 0) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  } else {
    return ''
  }
}

export function deslugify(slug) {
  if (!slug) {
    return ''
  }

  return String(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
}
