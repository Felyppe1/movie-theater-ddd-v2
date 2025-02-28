import Fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'
import fastifyCookie from 'fastify-cookie'

export class FastifyServer {
    private app: FastifyInstance

    constructor() {
        this.app = Fastify()

        this.app.register(fastifyCookie)

        this.app.register(routes)

        this.app.setErrorHandler((error, request, reply) => {
            // TODO: handle errors in here
            return reply.status(500).send(error.message)
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
