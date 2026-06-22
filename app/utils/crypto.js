// Importer la bibliothèque CryptoJS
import CryptoJS from 'crypto-js';

// Clé secrète pour le chiffrement/déchiffrement (à remplacer par votre propre clé secrète)
const SECRET_KEY = 'yD2Zin9,my#C5;3x8^C3j+=a5~{4HALE'

// Fonction pour chiffrer les données avec CryptoJS
export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

// Fonction pour déchiffrer les données avec CryptoJS
export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
