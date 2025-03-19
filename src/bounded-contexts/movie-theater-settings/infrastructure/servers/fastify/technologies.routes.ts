import { FastifyInstance } from 'fastify'
import { createTechnologyController } from '../../../controllers/create-technology-controller'

export async function technologiesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createTechnologyController,
    })
}
