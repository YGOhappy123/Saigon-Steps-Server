import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number().int().positive().default(5000),
    CLIENT_URL: z.url(),
    DASHBOARD_URL: z.url(),
    AI_SERVER_URL: z.url(),

    SQL_DEFAULT_AVATAR_URL: z.url(),
    SQL_DATABASE_URL: z.string().min(1),

    ACCESS_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
    RESET_PASSWORD_TOKEN_SECRET: z.string().min(1),
    MESSAGE_ENCRYPTION_KEY: z.string().min(1),

    GOOGLE_EMAIL: z.email(),
    GOOGLE_APP_PASSWORD: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_ENDPOINT: z.url(),

    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),

    ARCJET_KEY: z.string().min(1)
})

export const parsedEnv = envSchema.parse(process.env)
