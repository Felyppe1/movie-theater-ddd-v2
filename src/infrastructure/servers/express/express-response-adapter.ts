import {
    Cookie,
    Response,
} from '../../../interface-adapters/controllers/controller'
import { Response as ExpressResponse } from 'express'

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
