const deliveryCountriesMock = [
  {
    code: 'GP',
    name: 'Guadeloupe',
    flag: '/images/checkout/flags/guadeloupe_flag.png',
    deliveryFee: 4.5,
  },
  {
    code: 'MQ',
    name: 'Martinique',
    flag: '/images/checkout/flags/martinique_flag.png',
    deliveryFee: 8.9,
  },
  {
    code: 'MF',
    name: 'Saint-Martin',
    flag: '/images/checkout/flags/france_flag.png',
    deliveryFee: 12.9,
  },
  {
    code: 'FR',
    name: 'France',
    flag: '/images/checkout/flags/france_flag.png',
    deliveryFee: 14.9,
  },
]

export default defineEventHandler(async () => {
  return deliveryCountriesMock
})
