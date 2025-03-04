import 'dotenv/config'

import Fastify from 'fastify'
import fastifyCookie from 'fastify-cookie'
import { routes } from './infrastructure/servers/fastify/routes'
import { InvalidDataError } from './domain/errors/invalid-data-error'
import { NotFoundError } from './domain/errors/not-found-error'
import { ConflictError } from './domain/errors/conflict-error'

const app = Fastify()

app.register(fastifyCookie)

app.register(routes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof InvalidDataError) {
        return reply.status(400).send({ error: error.message })
    }

    if (error instanceof NotFoundError) {
        return reply.status(404).send({ error: error.message })
    }

    if (error instanceof ConflictError) {
        return reply.status(409).send({ error: error.message })
    }

    return reply.status(500).send({ error: error.message })
})

export default async (req: any, res: any) => {
    await app.ready()
    app.server.emit('request', req, res)
}
