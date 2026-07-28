const hexToNumber = (hexa) => {
  const normalized = String(hexa || '')
    .replace(/^#/, '')
    .trim()

  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((character) => character.repeat(2))
          .join('')
      : normalized

  return /^[0-9a-f]{6}$/i.test(expanded)
    ? Number.parseInt(expanded, 16)
    : -1
}

export const sortAvatarColorsByHex = (colors) =>
  [...(Array.isArray(colors) ? colors : [])].sort(
    (firstColor, secondColor) =>
      hexToNumber(firstColor?.hexa) - hexToNumber(secondColor?.hexa)
  )

export const normalizeAvatarColors = (colors) =>
  sortAvatarColorsByHex(colors).map((color) => ({
    ...color,
    colorValue: color.hexa
      ? `#${String(color.hexa).replace(/^#/, '')}`
      : color.colorValue || '',
  }))
