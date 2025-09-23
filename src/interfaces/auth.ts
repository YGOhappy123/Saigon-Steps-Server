import { Request } from 'express'

export interface RequestWithAuthData extends Request {
    auth?: AuthJwtPayload
}

export interface AuthJwtPayload {
    userId: number
    roleId?: number
}
