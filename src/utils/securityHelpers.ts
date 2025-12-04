import { parsedEnv } from '@/env'
import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY = Buffer.from(parsedEnv.MESSAGE_ENCRYPTION_KEY, 'base64')
const IV_LENGTH = 16

export const encryptString = (plainData: string) => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

    const encrypted = Buffer.concat([cipher.update(plainData, 'utf8'), cipher.final()])
    const authTag = cipher.getAuthTag()

    return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}

export const decryptString = (encryptedData: string) => {
    const data = Buffer.from(encryptedData, 'base64')

    const iv = data.subarray(0, IV_LENGTH)
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + 16)
    const encryptedText = data.subarray(IV_LENGTH + 16)

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])

    return decrypted.toString('utf8')
}
