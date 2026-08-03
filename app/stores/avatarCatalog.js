import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'
import { sortAvatarColorsByHex } from '~/utils/avatarColors'

const fetchJson = async (path) => {
  return await $fetch(path)
}

const normalizeSkinColor = (skinColor) => ({
  id: skinColor.id,
  name: skinColor.name || '',
  hexa: skinColor.hexa || '',
  colorValue: skinColor.hexa
    ? `#${String(skinColor.hexa).replace(/^#/, '')}`
    : '',
})

export const useAvatarCatalogStore = defineStore('avatarCatalog', {
  state: () => ({
    skincolors: [],
    morphologies: [],
    morphotypes: [],
    bodies: [],
    faces: [],
    accessoryFaces: [],
    hairs: [],
    haircolors: [],
    eyes: [],
    eyecolors: [],
    eyesbrow: [],
    eyebrowcolors: [],
    noses: [],
    mouthes: [],
    mouthcolors: [],
  }),
  actions: {
    async hydrateBaseCatalog() {
      await Promise.all([
        this.skincolors.length === 0 ? this.fetchSkinColors() : null,
      ])
    },
    async hydrateFromAvatarModel(model) {
      await this.hydrateBaseCatalog()

      await Promise.all([
        model?.skincolor?.id
          ? this.fetchFacesBySkinColorId(model.skincolor.id)
          : null,
        model?.skincolor?.id
          ? this.fetchNosesBySkinColorId(model.skincolor.id)
          : null,
      ])
    },
    async fetchSkinColors() {
      const data = await fetchJson('/api/avatar/skin-colors')
      this.hydrateSkinColors(data?.skinColors)
    },
    hydrateSkinColors(skinColors) {
      this.skincolors = Array.isArray(skinColors)
        ? sortAvatarColorsByHex(skinColors).map((skinColor) =>
            normalizeSkinColor(skinColor)
          )
        : []
    },
    async fetchMorphologiesBySkinColorId(skincolorId) {
      const data = await fetchJson(
        `/api/avatar/skin-colors/${skincolorId}/morphologies`
      )
      this.morphologies = Array.isArray(data?.items)
        ? data.items
        : data?.morphologies || []
      return this.morphologies
    },
    async fetchMorphotypesBySkinColorAndMorphology(skincolorId, morphologyId) {
      const data = await fetchJson(
        `/api/avatar/skin-colors/${skincolorId}/morphologies/${morphologyId}/morphotypes`
      )
      this.morphotypes = Array.isArray(data?.items)
        ? data.items
        : data?.morphotypes || []
      return this.morphotypes
    },
    async fetchFacesBySkinColorId(skincolorId) {
      const data = await fetchJson(`/api/avatar/skin-colors/${skincolorId}/faces`)
      this.faces = (Array.isArray(data?.items) ? data.items : []).filter(
        (face) => /-none-?$/i.test(String(face?.name || ''))
      )
      return this.faces
    },
    async fetchAccessoryFaces(skinColorId) {
      const data = await $fetch('/api/avatar/faces/accessories', {
        query: { skinColorId },
      })
      this.accessoryFaces = Array.isArray(data?.items) ? data.items : []
      return this.accessoryFaces
    },
    async fetchHairsByHairColorId(haircolorId) {
      const data = await fetchJson(
        `/api/avatar/hair-colors/${haircolorId}/hairs`
      )
      const hairs = Array.isArray(data?.hairs)
        ? data.hairs
        : Array.isArray(data?.items)
          ? data.items
          : []

      this.hairs = hairs.map((hair) => ({
        ...hair,
        frontImage: hair.frontImage || hair.images?.[0] || '',
        backImage: hair.backImage || hair.images?.[1] || '',
      }))
      return this.hairs
    },
    async fetchEyesByEyeColorId(eyecolorId) {
      const data = await fetchJson(
        `/api/avatar/eye-colors/${eyecolorId}/eyes`
      )
      this.eyes = Array.isArray(data?.items) ? data.items : []
      return this.eyes
    },
    async fetchEyesBrowByEyebrowColorId(eyebrowColorId) {
      const data = await fetchJson(
        `/api/avatar/eyebrow-colors/${eyebrowColorId}/eyebrows`
      )
      this.eyesbrow = Array.isArray(data?.items) ? data.items : []
      return this.eyesbrow
    },
    async fetchEyebrowColors() {
      const data = await fetchJson('/api/avatar/eyebrow-colors')
      this.eyebrowcolors = Array.isArray(data?.colors) ? data.colors : []
      return this.eyebrowcolors
    },
    async fetchNosesBySkinColorId(skincolorId) {
      const data = await fetchJson(`/api/avatar/skin-colors/${skincolorId}/noses`)
      this.noses = Array.isArray(data?.items) ? data.items : []
      return this.noses
    },
    async fetchBodiesBySkinColorAndMorphotype(skincolorId, morphotypeId) {
      const data = await fetchJson(
        `/api/avatar/skin-colors/${skincolorId}/morphotypes/${morphotypeId}/bodies`
      )
      this.bodies = Array.isArray(data?.items) ? data.items : []
      return this.bodies
    },
    async fetchMouthesByMouthColorId(mouthColorId) {
      const data = await fetchJson(
        `/api/avatar/mouth-colors/${mouthColorId}/mouths`
      )
      this.mouthes = Array.isArray(data?.items) ? data.items : []
      return this.mouthes
    },
    async fetchClothesByIds(clothesId) {
      const variantIds = JSON.stringify(clothesId)
      const data = await fetchJson(
        `/api/clothes-color-variant/get-color-variants-by-ids?variantIds=${variantIds}`
      )
      return data.variants || []
    },
    async fetchAvatarClothingByAttributes(payload) {
      return await $fetch('/api/avatar/get-avatarclothing-by-attributes', {
        method: 'POST',
        body: payload,
      })
    },
  },
})
