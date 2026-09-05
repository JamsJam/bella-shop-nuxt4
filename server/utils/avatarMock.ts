const avatarImage = (name: string) => `/images/avatar/${name}`

export const avatarMock = {
  skincolors: [
    { id: 5, name: 'Noir 1', colorValue: '#492f20' },
    { id: 6, name: 'Noir 2', colorValue: '#7b5438' },
    { id: 10, name: 'Blanc 1', colorValue: '#fbbd93' },
  ],
  morphologies: [
    {
      id: 53,
      name: 'Morphologie A',
      image: avatarImage('template_avatar_morphology.webp'),
    },
    {
      id: 54,
      name: 'Morphologie X',
      image: avatarImage('template_avatar_morphology.webp'),
    },
  ],
  morphotypes: [
    {
      id: 140,
      name: '[A-S]',
      morphology_id: 53,
      skincolor_id: 5,
      size_id: 14,
      size_name: 'S',
      image: avatarImage('template_avatar_morphology.webp'),
    },
    {
      id: 141,
      name: '[A-M]',
      morphology_id: 53,
      skincolor_id: 5,
      size_id: 15,
      size_name: 'M',
      image: avatarImage('template_avatar_morphology.webp'),
    },
    {
      id: 142,
      name: '[A-S]',
      morphology_id: 53,
      skincolor_id: 6,
      size_id: 14,
      size_name: 'S',
      image: avatarImage('template_avatar_morphology.webp'),
    },
    {
      id: 143,
      name: '[X-S]',
      morphology_id: 54,
      skincolor_id: 10,
      size_id: 14,
      size_name: 'S',
      image: avatarImage('template_avatar_morphology.webp'),
    },
  ],
  faces: [
    {
      id: 220,
      skincolor_id: 5,
      accessory_id: null,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 221,
      skincolor_id: 6,
      accessory_id: null,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 222,
      skincolor_id: 10,
      accessory_id: null,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 223,
      skincolor_id: 5,
      accessory_id: 1,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 224,
      skincolor_id: 5,
      accessory_id: 2,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 225,
      skincolor_id: 6,
      accessory_id: 1,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 226,
      skincolor_id: 10,
      accessory_id: 1,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 227,
      skincolor_id: 6,
      accessory_id: 2,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
    {
      id: 228,
      skincolor_id: 10,
      accessory_id: 2,
      face_variant: 'Ovale 2',
      image: avatarImage('template_avatar_face.webp'),
    },
  ],
  accessories: [
    { id: null, name: 'Aucun', type: 'none' },
    { id: 1, name: "Boucle d'oreille", type: 'earring' },
    { id: 2, name: 'Piercing visage', type: 'piercing' },
  ],
  haircolors: [
    { id: 1, name: 'Noir', colorValue: '#19130f' },
    { id: 2, name: 'Brun', colorValue: '#6b3f25' },
    { id: 3, name: 'Blond', colorValue: '#d7a94f' },
  ],
  hairs: [
    {
      id: 300,
      haircolor_id: 1,
      hair_variant: 'Coupe 1',
      frontImage: avatarImage('template_avatar_hair_front.webp'),
      backImage: avatarImage('template_avatar_hair_back.webp'),
    },
    {
      id: 301,
      haircolor_id: 2,
      hair_variant: 'Coupe 1',
      frontImage: avatarImage('template_avatar_hair_front.webp'),
      backImage: avatarImage('template_avatar_hair_back.webp'),
    },
    {
      id: 302,
      haircolor_id: 3,
      hair_variant: 'Coupe 1',
      frontImage: avatarImage('template_avatar_hair_front.webp'),
      backImage: avatarImage('template_avatar_hair_back.webp'),
    },
  ],
  eyecolors: [
    { id: 1, name: 'Marron', colorValue: '#5b3820' },
    { id: 2, name: 'Vert', colorValue: '#617f4d' },
    { id: 3, name: 'Bleu', colorValue: '#456f9d' },
  ],
  eyes: [
    {
      id: 400,
      eyecolor_id: 1,
      eyecolor: { id: 1 },
      eye_variant: 'Forme 1',
      image: avatarImage('template_avatar_eyes.webp'),
    },
    {
      id: 401,
      eyecolor_id: 2,
      eyecolor: { id: 2 },
      eye_variant: 'Forme 1',
      image: avatarImage('template_avatar_eyes.webp'),
    },
    {
      id: 402,
      eyecolor_id: 3,
      eyecolor: { id: 3 },
      eye_variant: 'Forme 1',
      image: avatarImage('template_avatar_eyes.webp'),
    },
  ],
  eyesbrow: [
    {
      id: 500,
      eyebrowcolor_id: 1,
      eyebrow_variant: 'Sourcil 1',
      name: 'Sourcil 1',
      image: avatarImage('template_avatar_eyebrow.webp'),
    },
    {
      id: 501,
      eyebrowcolor_id: 2,
      eyebrow_variant: 'Sourcil 1',
      name: 'Sourcil 1',
      image: avatarImage('template_avatar_eyebrow.webp'),
    },
  ],
  eyebrowcolors: [
    { id: 1, name: 'Noir', colorValue: '#19130f' },
    { id: 2, name: 'Brun', colorValue: '#6b3f25' },
  ],
  noses: [
    {
      id: 600,
      skincolor_id: 5,
      nose_variant: 'Forme1-4',
      image: avatarImage('template_avatar_nose.webp'),
    },
    {
      id: 601,
      skincolor_id: 6,
      nose_variant: 'Forme1-4',
      image: avatarImage('template_avatar_nose.webp'),
    },
    {
      id: 602,
      skincolor_id: 10,
      nose_variant: 'Forme1-4',
      image: avatarImage('template_avatar_nose.webp'),
    },
  ],
  mouthes: [
    {
      id: 700,
      mouthcolor_id: 1,
      mouth_variant: 'Bouche 1',
      name: 'Bouche 1',
      image: avatarImage('template_avatar_mouth.webp'),
    },
    {
      id: 701,
      mouthcolor_id: 2,
      mouth_variant: 'Bouche 1',
      name: 'Bouche 1',
      image: avatarImage('template_avatar_mouth.webp'),
    },
  ],
  mouthcolors: [
    { id: 1, name: 'Rose', colorValue: '#b76578' },
    { id: 2, name: 'Prune', colorValue: '#74344f' },
  ],
  clothes: [
    {
      id: 800,
      name: 'Top placeholder',
      type: 'Haut',
      slug: 'top-placeholder',
      preview_image: '/images/clothes/category_banniere.jpg',
      image: '/images/clothes/category_banniere.jpg',
      price: 29,
    },
    {
      id: 801,
      name: 'Bas placeholder',
      type: 'Bas',
      slug: 'bas-placeholder',
      preview_image: '/images/clothes/category_banniere.jpg',
      image: '/images/clothes/category_banniere.jpg',
      price: 39,
    },
    {
      id: 802,
      name: 'Ensemble placeholder',
      type: 'Ensemble',
      slug: 'ensemble-placeholder',
      preview_image: '/images/clothes/category_banniere.jpg',
      image: '/images/clothes/category_banniere.jpg',
      price: 59,
    },
  ],
}

export const filterByNumericQuery = <T extends Record<string, unknown>>(
  items: T[],
  key: keyof T,
  value: unknown
) => {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return items
  }

  return items.filter((item) => item[key] === numericValue)
}

const avatarPartDefinitions = {
  skincolors: {
    responseKey: 'skincolors',
    items: avatarMock.skincolors,
  },
  morphologies: {
    responseKey: 'morphologies',
    items: avatarMock.morphologies,
  },
  morphotypes: {
    responseKey: 'morphotypes',
    items: avatarMock.morphotypes,
    colorKey: 'skincolor_id',
  },
  faces: {
    responseKey: 'faces',
    items: avatarMock.faces,
    colorKey: 'skincolor_id',
  },
  accessories: {
    responseKey: 'accessories',
    items: avatarMock.accessories,
  },
  haircolors: {
    responseKey: 'haircolors',
    items: avatarMock.haircolors,
  },
  hairs: {
    responseKey: 'hairs',
    items: avatarMock.hairs,
    colorKey: 'haircolor_id',
  },
  eyecolors: {
    responseKey: 'eyecolors',
    items: avatarMock.eyecolors,
  },
  eyes: {
    responseKey: 'eyes',
    items: avatarMock.eyes,
    colorKey: 'eyecolor_id',
  },
  eyebrowcolors: {
    responseKey: 'eyebrowcolors',
    items: avatarMock.eyebrowcolors,
  },
  eyebrows: {
    responseKey: 'eyesbrow',
    items: avatarMock.eyesbrow,
    colorKey: 'eyebrowcolor_id',
  },
  eyesbrow: {
    responseKey: 'eyesbrow',
    items: avatarMock.eyesbrow,
    colorKey: 'eyebrowcolor_id',
  },
  noses: {
    responseKey: 'noses',
    items: avatarMock.noses,
    colorKey: 'skincolor_id',
  },
  mouthcolors: {
    responseKey: 'mouthcolors',
    items: avatarMock.mouthcolors,
  },
  mouths: {
    responseKey: 'mouthes',
    items: avatarMock.mouthes,
    colorKey: 'mouthcolor_id',
  },
  mouthes: {
    responseKey: 'mouthes',
    items: avatarMock.mouthes,
    colorKey: 'mouthcolor_id',
  },
}

type AvatarPart = keyof typeof avatarPartDefinitions

const getAvatarPartDefinition = (part: string) => {
  const definition = avatarPartDefinitions[part as AvatarPart]

  if (!definition) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown avatar part: ${part}`,
    })
  }

  return definition
}

export const getAvatarPartPayload = (part: string) => {
  const definition = getAvatarPartDefinition(part)

  return {
    [definition.responseKey]: definition.items,
  }
}

export const getAvatarPartByColorPayload = (
  part: string,
  colorId: unknown,
  extraFilters: Record<string, unknown> = {}
) => {
  const definition = getAvatarPartDefinition(part)

  let items = definition.items

  if ('colorKey' in definition && definition.colorKey) {
    items = filterByNumericQuery(items, definition.colorKey, colorId)
  }

  if (part === 'morphotypes' && extraFilters.morphologyId) {
    items = filterByNumericQuery(items, 'morphology_id', extraFilters.morphologyId)
  }

  if (part === 'faces' && extraFilters.accessoryOnly) {
    items = items.filter((item) => item.accessory_id !== null)
  } else if (part === 'faces' && 'accessoryId' in extraFilters) {
    const accessoryId =
      extraFilters.accessoryId === '' || extraFilters.accessoryId === null
        ? null
        : Number(extraFilters.accessoryId)
    const normalizedAccessoryId =
      accessoryId === null || !Number.isFinite(accessoryId)
        ? null
        : accessoryId

    items = items.filter((item) => item.accessory_id === normalizedAccessoryId)
  }

  if (part === 'faces' && extraFilters.faceVariant) {
    items = items.filter((item) => item.face_variant === extraFilters.faceVariant)
  }

  return {
    [definition.responseKey]: items,
  }
}
