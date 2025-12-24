import randomstring from 'randomstring'

export const capitalizeWords = (input: string, lowerOtherChars: boolean = true) => {
    const MULTI_SPACE_REGEX = /\s+/g

    if (!input.trim()) return ''
    return input
        .trim()
        .replace(MULTI_SPACE_REGEX, ' ')
        .split(' ')
        .map(word => `${word.charAt(0).toUpperCase()}${lowerOtherChars ? word.substring(1).toLowerCase() : word.substring(1)}`)
        .join(' ')
}

export const capitalizeFirstWord = (input: string) => {
    const MULTI_SPACE_REGEX = /\s+/g

    if (!input.trim()) return ''
    return input.trim().charAt(0).toUpperCase() + input.trim().replace(MULTI_SPACE_REGEX, ' ').substring(1).toLowerCase()
}

export const uppercaseWords = (input: string) => {
    const MULTI_SPACE_REGEX = /\s+/g

    if (!input.trim()) return ''
    return input.trim().replace(MULTI_SPACE_REGEX, ' ').toUpperCase()
}

export const generateRandomString = (length?: number) => {
    const RANDOM_STRING_LENGTH = 16

    return randomstring.generate(length ?? RANDOM_STRING_LENGTH)
}

const calculateEAN13Checksum = (code12: string) => {
    let sum = 0

    for (let i = 0; i < 12; i++) {
        const digit = Number(code12[i])
        sum += i % 2 === 0 ? digit : digit * 3
    }

    return (10 - (sum % 10)) % 10
}

export const generateProductBarcode = () => {
    const prefix = '20'
    const randomSequence = randomstring.generate({
        length: 10,
        charset: 'numeric'
    })

    const code12 = prefix + randomSequence
    const checksum = calculateEAN13Checksum(code12)

    return code12 + checksum
}
