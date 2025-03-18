import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'
import fastifyCookie from 'fastify-cookie'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'
import { ConflictError } from '../../../domain/errors/conflict-error'
import { NotFoundError } from '../../../domain/errors/not-found-error'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

export const fastify = Fastify()

fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
})

fastify.register(fastifyCookie)

fastify.register(multipart)

fastify.register(routes)

fastify.setErrorHandler((error, request, reply) => {
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

export async function startFastifyLocalServer(port = 3333) {
    try {
        await fastify.listen({ port, host: '0.0.0.0' })

        console.log(`Fastify server is running on http://localhost:${port}`)
    } catch (error) {
        console.error(`Failed to start server: ${error}`)
        process.exit(1)
    }
}
