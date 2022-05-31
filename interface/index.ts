import { Request } from "express"

export interface IRequest extends Request {
    meta?: {
        url: string
    }
}