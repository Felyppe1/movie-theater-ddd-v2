import { FastifyInstance } from 'fastify'
import { createChairTypePriceController } from '../../../controllers/create-chair-type-price-controller'

export async function chairTypePricesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createChairTypePriceController,
    })
}
