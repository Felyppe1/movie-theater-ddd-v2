import Fastify, { FastifyInstance } from 'fastify'
import { Server } from '..'
import { movieTheaterSettingsRoutes } from '../bounded-contexts/movie-theater-settings/infrastructure/servers/fastify'

export class FastifyServer implements Server {
    private app: FastifyInstance

    constructor() {
        this.app = Fastify()

        movieTheaterSettingsRoutes(this.app)
        // this.app.register(movieTheaterSettingsRoutes)
    }

    async start(port: number): Promise<void> {
        try {
            await this.app.listen({ port, host: '0.0.0.0' })

            console.log(`Fastify server is running on http://localhost:${port}`)
        } catch (error) {
            console.error(`Failed to start server: ${error}`)
            process.exit(1)
        }
    }
}
