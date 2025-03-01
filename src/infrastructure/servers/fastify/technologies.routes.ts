import { FastifyInstance } from 'fastify'
import { handleCreateTechnology } from './handlers/technologies-handlers'

export async function technologiesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: handleCreateTechnology,
    })
}
