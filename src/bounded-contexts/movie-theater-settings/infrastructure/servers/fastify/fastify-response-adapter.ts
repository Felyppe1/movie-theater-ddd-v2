import { FastifyReply } from 'fastify'
import {
    Cookie,
    Response,
} from '../../../interface-adapters/controllers/controller'

export class FastifyResponseAdapter implements Response {
    private statusCode: number = 200
    private data?: any

    constructor(private reply: FastifyReply) {}

    status(statusCode: number): this {
        this.statusCode = statusCode

        return this
    }

    body(data: any): this {
        this.data = data

        return this
    }

    cookie(name: string, value: string, data: Cookie): this {
        this.reply.cookie(name, value, data)

        return this
    }

    send(): this {
        if (!this.data) {
            this.reply.status(this.statusCode).send()

            return this
        }

        this.reply.status(this.statusCode).send(this.data)

        return this
    }
}
