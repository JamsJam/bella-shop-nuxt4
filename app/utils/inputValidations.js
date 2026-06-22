const inputValidations = {
  validateAlphanumericDash(input) {
    if (input === '') return true
    const regex = /^[\p{L}0-9-]+$/u
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des lettres majuscules et minuscules
  validateAlphabetic(input) {
    if (input === '') return true
    const regex = /^[\p{L}]+$/u
    return regex.test(input)
  },

  validateAlphabeticDash(input) {
    if (input === '') return true
    const regex = /^[\p{L}-]+$/u
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des chiffres
  validateNumeric(input) {
    if (input === '') return true
    const regex = /^[0-9]+$/
    return regex.test(input)
  },

  validateNumericSpace(input) {
    if (input === '') return true
    const regex = /^[0-9\s]+$/
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des lettres majuscules, des lettres minuscules et des chiffres
  validateAlphanumeric(input) {
    if (input === '') return true
    const regex = /^[\p{L}0-9]+$/u
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des lettres majuscules, des lettres minuscules, des chiffres et des espaces
  validateAlphanumericSpace(input) {
    if (input === '') return true
    const regex = /^[\p{L}0-9\s]+$/u
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des lettres majuscules et minuscules, des chiffres, des espaces, des tirets et des traits de soulignement
  validateAlphanumericSpaceDashUnderscore(input) {
    if (input === '') return true
    const regex = /^[\p{L}0-9\s_\-']+$/u
    return regex.test(input)
  },

  // Validation pour autoriser uniquement des lettres majuscules, des lettres minuscules, des chiffres, des espaces et des virgules
  validateAlphanumericCommaSpace(input) {
    if (input === '') return true
    const regex = /^[\p{L}0-9\s,]+$/u
    return regex.test(input)
  },

  // Validation pour les numéros de téléphone avec un paramètre de pays
  validatePhoneNumber(phoneNumber, country) {
    // Dictionnaire des expressions régulières pour différents pays
    const phoneRegexByCountry = {
      // Ajoutez des expressions régulières pour d'autres pays si nécessaire
      FR: /^(?:\+?\d{1,4}[\s.-]?)?(?:\d[\s.-]?){7,11}\d$/,
      GP: /^(?:\+?\d{1,4}[\s.-]?)?(?:\d[\s.-]?){7,11}\d$/, // Accepter n'importe quel numéro de téléphone de 6 à 9 chiffres pour GP
      MQ: /^(?:\+?\d{1,4}[\s.-]?)?(?:\d[\s.-]?){7,11}\d$/, // Accepter n'importe quel numéro de téléphone de 6 à 9 chiffres pour GP
      MF: /^(?:\+?\d{1,4}[\s.-]?)?(?:\d[\s.-]?){7,11}\d$/, // Accepter n'importe quel numéro de téléphone de 6 à 9 chiffres pour GP
      // Ajoutez d'autres pays ici...
    }

    // Vérifie si le pays est pris en charge
    if (!phoneRegexByCountry.hasOwnProperty(country)) {
      throw new Error(`Pays non pris en charge: ${country}`)
    }

    // Récupère l'expression régulière pour le pays spécifié
    const regex = phoneRegexByCountry[country]

    // Supprime tous les espaces du numéro de téléphone
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, '')

    // Valide le numéro de téléphone sans espaces avec l'expression régulière du pays
    return regex.test(phoneNumberWithoutSpaces)
  },

  // Validation pour un code ISO de pays
  validateCountryCode(input) {
    // Expression régulière pour vérifier un code ISO de pays à deux lettres en majuscules
    const regex = /^[A-Z]{2}$/
    return regex.test(input)
  },

  // Validation pour un code ISO de pays
  validateMunicipality(input) {
    // Liste des municipalités autorisées
    const municipalities = [
      {
        id: 1,
        label: 'Pointe-à-Pitre',
        value: 'Pointe-à-Pitre',
        deliveryDay: 'Lundi',
      },
      {
        id: 2,
        label: 'Baie-Mahault',
        value: 'Baie-Mahault',
        deliveryDay: 'Lundi',
      },
      {
        id: 3,
        label: 'Petit-Bourg',
        value: 'Petit-Bourg',
        deliveryDay: 'Lundi',
      },
      { id: 4, label: 'Goyave', value: 'Goyave', deliveryDay: 'Lundi' },
      { id: 5, label: 'Capesterre', value: 'Capesterre', deliveryDay: 'Lundi' },
      { id: 6, label: 'Abymes', value: 'Abymes', deliveryDay: 'Mardi' },
      {
        id: 7,
        label: "Morne-à-L'eau",
        value: "Morne-à-L'eau",
        deliveryDay: 'Mardi',
      },
      {
        id: 8,
        label: 'Petit-Canal',
        value: 'Petit-Canal',
        deliveryDay: 'Mardi',
      },
      { id: 9, label: 'Port-Louis', value: 'Port-Louis', deliveryDay: 'Mardi' },
      {
        id: 10,
        label: 'Anse-Bertrand',
        value: 'Anse-Bertrand',
        deliveryDay: 'Mardi',
      },
      {
        id: 11,
        label: 'Trois-Rivières',
        value: 'Trois-Rivières',
        deliveryDay: 'Mercredi',
      },
      {
        id: 12,
        label: 'Gourbeyre',
        value: 'Gourbeyre',
        deliveryDay: 'Mercredi',
      },
      {
        id: 13,
        label: 'Saint-Claude',
        value: 'Saint-Claude',
        deliveryDay: 'Mercredi',
      },
      {
        id: 14,
        label: 'Basse-Terre',
        value: 'Basse-Terre',
        deliveryDay: 'Mercredi',
      },
      { id: 15, label: 'Baillif', value: 'Baillif', deliveryDay: 'Mercredi' },
      {
        id: 16,
        label: 'Vieux-Habitant',
        value: 'Vieux-Habitant',
        deliveryDay: 'Mercredi',
      },
      { id: 17, label: 'Lamentin', value: 'Lamentin', deliveryDay: 'Jeudi' },
      {
        id: 18,
        label: 'Saint-Rose',
        value: 'Saint-Rose',
        deliveryDay: 'Jeudi',
      },
      { id: 19, label: 'Deshaies', value: 'Deshaies', deliveryDay: 'Jeudi' },
      {
        id: 20,
        label: 'Pointe-Noire',
        value: 'Pointe-Noire',
        deliveryDay: 'Jeudi',
      },
      {
        id: 21,
        label: 'Bouillante',
        value: 'Bouillante',
        deliveryDay: 'Jeudi',
      },
      { id: 22, label: 'Gosier', value: 'Gosier', deliveryDay: 'Vendredi' },
      {
        id: 23,
        label: 'Saint-Anne',
        value: 'Saint-Anne',
        deliveryDay: 'Vendredi',
      },
      {
        id: 24,
        label: 'Saint-François',
        value: 'Saint-François',
        deliveryDay: 'Vendredi',
      },
      { id: 25, label: 'Moule', value: 'Moule', deliveryDay: 'Vendredi' },
    ]

    // Vérifier si l'entrée correspond à une municipalité valide
    return municipalities.some((municipality) => municipality.label === input)
  },

  validatePassword(input) {
    // Vérifie si l'input contient au moins une majuscule, une minuscule, un chiffre et un caractère spécial
    const uppercaseRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const digitRegex = /[0-9]/
    const specialCharRegex = /[^A-Za-z0-9]/ // Caractères spéciaux autres que les lettres et les chiffres

    const containsUppercase = uppercaseRegex.test(input)
    const containsLowercase = lowercaseRegex.test(input)
    const containsDigit = digitRegex.test(input)
    const containsSpecialChar = specialCharRegex.test(input)

    // Vérifie également s'il n'y a pas de caractères pouvant être utilisés dans des injections SQL
    const sqlInjectionRegex = /['";]/ // Caractères couramment utilisés dans les injections SQL

    // Retourne true si toutes les conditions sont remplies et s'il n'y a pas de caractères d'injection SQL, sinon false
    return (
      containsUppercase &&
      containsLowercase &&
      containsDigit &&
      containsSpecialChar &&
      !sqlInjectionRegex.test(input)
    )
  },

  validateEmail(input) {
    // Expression régulière pour vérifier le format d'un e-mail
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9]+$/

    // Vérifie si l'adresse e-mail correspond au format requis
    if (!emailRegex.test(input)) {
      throw new Error("L'adresse e-mail n'est pas valide.")
    }

    return true
  },

  validateBasicMessage(input) {
    // Expression régulière pour les caractères autorisés
    const allowedRegex = /^[\p{L}0-9\s\-.,?!()'"/]+$/u

    // Vérifie si l'entrée correspond à la regex autorisée
    return allowedRegex.test(input)
  },

  containsSQLKeywords(input) {
    const sqlKeywords = [
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE',
      'FROM',
      'WHERE',
      'LIKE',
      'BETWEEN',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'OUTER JOIN',
      'GROUP BY',
      'ORDER BY',
      'HAVING',
      'CREATE',
      'ALTER',
      'DROP',
      'TRUNCATE',
      'VIEW',
      'INDEX',
      'SEQUENCE',
      'PROCEDURE',
      'FUNCTION',
      'CONSTRAINT',
      'FOREIGN KEY',
      'PRIMARY KEY',
      'DEFAULT',
      'VALUES',
      'COMMIT',
      'ROLLBACK',
      'SAVEPOINT',
      'START TRANSACTION',
      'ROLLBACK TRANSACTION',
      'TRANSACTION',
      'VARCHAR',
      'CHAR',
      'INTEGER',
      'SMALLINT',
      'BIGINT',
      'FLOAT',
      'REAL',
      'DOUBLE',
      'DECIMAL',
      'NUMERIC',
      'TIME',
      'TIMESTAMP',
      'BOOLEAN',
      'BINARY',
      'VARBINARY',
      'BLOB',
      'CLOB',
      'COUNT',
      'AVG',
      'ROUND',
      'TRUNC',
      'LENGTH',
      'LOWER',
      'UPPER',
      'LTRIM',
      'RTRIM',
      'TRIM',
      'SUBSTRING',
      'CONCAT',
      'REPLACE',
      'NVL',
      'CASE',
      'DECODE',
      'ELSE',
      'WHEN',
      'THEN',
      'END',
      'COALESCE',
      'NULLIF',
    ]

    // Convertir l'entrée en majuscules pour une correspondance insensible à la casse
    const inputUpperCase = input.toUpperCase()

    // Vérifier si l'un des mots-clés SQL est présent dans l'entrée
    return sqlKeywords.some((keyword) => inputUpperCase.includes(keyword))
  },

  isNotEmpty(input) {
    return input !== null && input !== undefined && input.trim() !== ''
  },

  // Fonction pour valider la longueur de l'entrée
  validateLength(input, minLength, maxLength) {
    const trimmedInput = input.trim()
    return trimmedInput.length >= minLength && trimmedInput.length <= maxLength
  },
}

export default inputValidations
