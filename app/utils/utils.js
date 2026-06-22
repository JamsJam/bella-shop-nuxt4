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
