import { FastifyReply, FastifyRequest } from 'fastify'
import {
    Cookie,
    Request,
    Response,
} from '../../../interface-adapters/controllers/controller'

export function normalizeFastifyRequest<T = unknown>(
    req: FastifyRequest,
): Request<T> {
    return {
        body: req.body as T,
        params: req.params as Record<string, string>,
        query: Object.fromEntries(
            Object.entries(req.query as Record<string, any>).map(
                ([key, value]) => [key, String(value)],
            ),
        ) as Record<string, string>,
        headers: Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
                key,
                String(value),
            ]),
        ) as Record<string, string>,
    }
}

export class FastifyResponseAdapter implements Response<any> {
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
