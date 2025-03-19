import { FastifyInstance } from 'fastify'
import { createChairTypeController } from '../../../controllers/create-chair-type-controller'

export async function chairTypesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createChairTypeController,
    })
}
