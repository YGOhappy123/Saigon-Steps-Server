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

export const generateProductBarcode = (length?: number) => {
    const RANDOM_STRING_LENGTH = 12

    return randomstring.generate({
        length: length ?? RANDOM_STRING_LENGTH,
        charset: 'numeric'
    })
}
