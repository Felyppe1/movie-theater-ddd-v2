import Fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'
import fastifyCookie from 'fastify-cookie'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'
import { ConflictError } from '../../../domain/errors/conflict-error'
import { NotFoundError } from '../../../domain/errors/not-found-error'

export class FastifyServer {
    private app: FastifyInstance

    constructor() {
        this.app = Fastify()

        this.app.register(fastifyCookie)

        this.app.register(routes)

        this.app.setErrorHandler((error, request, reply) => {
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
    }

    async startServer(port: number): Promise<void> {
        try {
            await this.app.listen({ port, host: '0.0.0.0' })

            console.log(`Fastify server is running on http://localhost:${port}`)
        } catch (error) {
            console.error(`Failed to start server: ${error}`)
            process.exit(1)
        }
    }
}
