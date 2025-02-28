import {
    Cookie,
    Request,
    Response,
} from '../../../interface-adapters/controllers/controller'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

// export class ExpressRequestAdapter<T = unknown> {
//     body?: T
//     params?: Record<string, string>
//     query?: Record<string, string | string[] | undefined>
//     headers?: Record<string, string | string[] | undefined>

//     constructor(req: ExpressRequest) {
//         this.body = req.body
//         this.params = req.params
//         this.query = req.query
//         this.headers = req.headers
//     }
// }

export function normalizeExpressRequest<T = unknown>(
    req: ExpressRequest,
): Request<T> {
    return {
        body: req.body,
        params: req.params,
        query: Object.fromEntries(
            Object.entries(req.query).map(([key, value]) => [
                key,
                String(value),
            ]),
        ) as Record<string, string>,
        headers: Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
                key,
                String(value),
            ]),
        ) as Record<string, string>,
    }
}

export class ExpressResponseAdapter implements Response<any> {
    private statusCode: number = 200
    private data: any

    constructor(private response: ExpressResponse) {}

    status(statusCode: number): this {
        this.statusCode = statusCode

        return this
    }

    body(data: any): this {
        this.data = data

        return this
    }

    cookie(name: string, value: string, data: Cookie): this {
        this.response.cookie(name, value, data)

        return this
    }

    send(): this {
        if (!this.data) {
            this.response.sendStatus(this.statusCode)

            return this
        }

        this.response.status(this.statusCode).json(this.data)

        return this
    }
}
