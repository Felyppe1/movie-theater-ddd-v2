import { FastifyInstance } from 'fastify'
import { createRoomController } from '../../../controllers/create-room-controller'
import { updateRoomController } from '../../../controllers/update-room-controller'
import { getRoomController } from '../../../controllers/get-room-controller'

export async function roomsRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createRoomController,
    })

    fastify.route({
        method: 'PUT',
        url: '/',
        handler: updateRoomController,
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: getRoomController,
    })
}
