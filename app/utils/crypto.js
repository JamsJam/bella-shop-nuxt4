import CryptoJS from 'crypto-js'

let cryptoSecretKey = null

async function getCryptoSecretKey() {
  if (cryptoSecretKey) {
    return cryptoSecretKey
  }

  const response = await fetch('/api/crypto/key')

  if (!response.ok) {
    throw new Error('Impossible de récupérer la clé de chiffrement')
  }

  const data = await response.json()
  cryptoSecretKey = data.key

  return cryptoSecretKey
}

export async function encryptData(data) {
  const secretKey = await getCryptoSecretKey()
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
}

export async function decryptData(encryptedData) {
  const secretKey = await getCryptoSecretKey()
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
