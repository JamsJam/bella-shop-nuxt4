import { defineStore } from 'pinia'
import { encryptData, decryptData } from '~/utils/crypto'

const defaultAvatarModel = () => ({
  morphology: {
    image: '/images/avatar/template_avatar_morphology.webp',
  },
  morphotype: null,
  face: {
    image: '/images/avatar/template_avatar_face.webp',
  },
  accessory: null,
  hair: {
    frontImage: '/images/avatar/template_avatar_hair_front.webp',
    backImage: '/images/avatar/template_avatar_hair_back.webp',
  },
  eyes: {
    image: '/images/avatar/template_avatar_eyes.webp',
  },
  mouth: {
    image: '/images/avatar/template_avatar_mouth.webp',
  },
  nose: {
    image: '/images/avatar/template_avatar_nose.webp',
  },
  eyebrow: {
    image: '/images/avatar/template_avatar_eyebrow.webp',
  },
  skincolor: null,
  haircolor: null,
  eyecolor: null,
  mouthcolor: null,
  eyebrowcolor: null,
  selectedClothing: null,
  avatarClothing: null,
})

const normalizeAvatarModel = (model = {}) => ({
  ...defaultAvatarModel(),
  ...model,
  morphology: model.morphology || defaultAvatarModel().morphology,
  morphotype: model.morphotype || null,
  face: model.face || defaultAvatarModel().face,
  accessory: model.accessory || null,
  hair: model.hair || defaultAvatarModel().hair,
  eyes: model.eyes || defaultAvatarModel().eyes,
  mouth: model.mouth || defaultAvatarModel().mouth,
  nose: model.nose || defaultAvatarModel().nose,
  eyebrow: model.eyebrow || defaultAvatarModel().eyebrow,
  skincolor: model.skincolor || null,
  haircolor: model.haircolor || null,
  eyecolor: model.eyecolor || null,
  mouthcolor: model.mouthcolor || null,
  eyebrowcolor: model.eyebrowcolor || null,
  selectedClothing: model.selectedClothing || null,
  avatarClothing: model.avatarClothing || null,
})

export const useAvatarStore = defineStore('avatar', {
  state: () => ({
    clothesId: [],
    model: defaultAvatarModel(),
  }),
  getters: {
    avatarBody(state) {
      if (state.model.avatarClothing) {
        return state.model.avatarClothing.image
      }
      if (state.model.morphotype) {
        return state.model.morphotype.image
      }
      return state.model.morphology.image
    },
  },
  actions: {
    save() {
      if (!import.meta.client) {
        return
      }

      const encryptedAvatar = encryptData({
        clothesId: this.clothesId,
        model: this.model,
      })
      localStorage.setItem('avatar', encryptedAvatar)
    },
    load() {
      if (!import.meta.client) {
        return
      }

      const encryptedAvatar = localStorage.getItem('avatar')

      if (!encryptedAvatar) {
        this.save()
        return
      }

      try {
        const decryptedAvatar = decryptData(encryptedAvatar)
        this.clothesId = decryptedAvatar.clothesId || []
        this.model = normalizeAvatarModel(decryptedAvatar.model)
      } catch (error) {
        this.clothesId = []
        this.model = defaultAvatarModel()
        this.save()
      }
    },
    setClothesId(clothesId) {
      this.clothesId = clothesId
      this.save()
    },
    setModel(model) {
      this.model = normalizeAvatarModel(model)
      this.save()
    },
  },
})
