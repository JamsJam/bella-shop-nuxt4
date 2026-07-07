import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'

const fetchJson = async (path) => {
  return await $fetch(path)
}

export const useAvatarCatalogStore = defineStore('avatarCatalog', {
  state: () => ({
    skincolors: [],
    morphologies: [],
    morphotypes: [],
    faces: [],
    accessoryFaces: [],
    accessories: [],
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
        this.morphologies.length === 0 ? this.fetchMorphologies() : null,
        this.accessories.length === 0 ? this.fetchAccessories() : null,
        this.haircolors.length === 0 ? this.fetchHairColors() : null,
        this.eyecolors.length === 0 ? this.fetchEyeColors() : null,
        this.eyebrowcolors.length === 0 ? this.fetchEyebrowColors() : null,
        this.mouthcolors.length === 0 ? this.fetchMouthColors() : null,
      ])
    },
    async hydrateFromAvatarModel(model) {
      await this.hydrateBaseCatalog()

      await Promise.all([
        model?.skincolor?.id && model?.morphology?.id
          ? this.fetchMorphotypesBySkinColorAndMorphology(
              model.skincolor.id,
              model.morphology.id
            )
          : null,
        model?.skincolor?.id
          ? this.fetchFacesBySkinColorId(
              model.skincolor.id,
              model.accessory?.id || null
            )
          : null,
        model?.skincolor?.id
          ? this.fetchNosesBySkinColorId(model.skincolor.id)
          : null,
        model?.haircolor?.id
          ? this.fetchHairsByHairColorId(model.haircolor.id)
          : null,
        model?.eyecolor?.id ? this.fetchEyesByEyeColorId(model.eyecolor.id) : null,
        model?.eyebrowcolor?.id
          ? this.fetchEyesBrowByEyebrowColorId(model.eyebrowcolor.id)
          : null,
        model?.mouthcolor?.id
          ? this.fetchMouthesByMouthColorId(model.mouthcolor.id)
          : null,
      ])
    },
    async fetchSkinColors() {
      const data = await fetchJson('/api/avatar/skincolors/getAll')
      this.skincolors = data.skincolors || []
    },
    async fetchMorphologies() {
      const data = await fetchJson('/api/avatar/morphologies/getAll')
      this.morphologies = data.morphologies || []
    },
    async fetchMorphotypesBySkinColorAndMorphology(skincolorId, morphologyId) {
      const data = await fetchJson(
        `/api/avatar/morphotypes/getByColor?colorId=${skincolorId}&morphologyId=${morphologyId}`
      )
      this.morphotypes = data.morphotypes || []
      return this.morphotypes
    },
    async fetchFacesBySkinColorId(skincolorId, accessoryId = null) {
      const data = await fetchJson(
        `/api/avatar/faces/getByColor?colorId=${skincolorId}&accessoryId=${accessoryId || ''}`
      )
      this.faces = data.faces || []
      return this.faces
    },
    async fetchAccessoryFacesBySkinColorId(skincolorId, faceVariant) {
      const faceVariantQuery = faceVariant
        ? `&faceVariant=${encodeURIComponent(faceVariant)}`
        : ''
      const data = await fetchJson(
        `/api/avatar/faces/getByColor?colorId=${skincolorId}&accessoryOnly=true${faceVariantQuery}`
      )
      this.accessoryFaces = data.faces || []
      return this.accessoryFaces
    },
    async fetchAccessories() {
      const data = await fetchJson('/api/avatar/accessories/getAll')
      this.accessories = data.accessories || []
    },
    async fetchHairsByHairColorId(haircolorId) {
      const data = await fetchJson(`/api/avatar/hairs/getByColor?colorId=${haircolorId}`)
      this.hairs = data.hairs || []
      return this.hairs
    },
    async fetchHairColors() {
      const data = await fetchJson('/api/avatar/haircolors/getAll')
      this.haircolors = data.haircolors || []
    },
    async fetchEyesByEyeColorId(eyecolorId) {
      const data = await fetchJson(`/api/avatar/eyes/getByColor?colorId=${eyecolorId}`)
      this.eyes = data.eyes || []
      return this.eyes
    },
    async fetchEyeColors() {
      const data = await fetchJson('/api/avatar/eyecolors/getAll')
      this.eyecolors = data.eyecolors || []
    },
    async fetchEyesBrow() {
      const data = await fetchJson('/api/avatar/eyebrows/getAll')
      this.eyesbrow = data.eyesbrow || []
    },
    async fetchEyesBrowByEyebrowColorId(eyebrowColorId) {
      const data = await fetchJson(
        `/api/avatar/eyebrows/getByColor?colorId=${eyebrowColorId}`
      )
      this.eyesbrow = data.eyesbrow || []
      return this.eyesbrow
    },
    async fetchEyebrowColors() {
      const data = await fetchJson('/api/avatar/eyebrowcolors/getAll')
      this.eyebrowcolors = data.eyebrowcolors || []
    },
    async fetchNosesBySkinColorId(skincolorId) {
      const data = await fetchJson(`/api/avatar/noses/getByColor?colorId=${skincolorId}`)
      this.noses = data.noses || []
      return this.noses
    },
    async fetchMouthes() {
      const data = await fetchJson('/api/avatar/mouths/getAll')
      this.mouthes = data.mouthes || []
    },
    async fetchMouthesByMouthColorId(mouthColorId) {
      const data = await fetchJson(`/api/avatar/mouths/getByColor?colorId=${mouthColorId}`)
      this.mouthes = data.mouthes || []
      return this.mouthes
    },
    async fetchMouthColors() {
      const data = await fetchJson('/api/avatar/mouthcolors/getAll')
      this.mouthcolors = data.mouthcolors || []
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
