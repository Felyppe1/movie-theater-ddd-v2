import { FastifyInstance } from 'fastify'
import { createSessionController } from '../../../controllers/create-session-controller'

export async function sessionsRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createSessionController,
    })
}
