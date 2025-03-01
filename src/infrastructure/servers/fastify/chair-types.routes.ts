import { FastifyInstance } from 'fastify'
import { handleCreateChairType } from './handlers/chair-types-handlers'

export async function chairTypesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: handleCreateChairType,
    })
}
