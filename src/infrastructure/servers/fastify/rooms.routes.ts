import { FastifyInstance } from 'fastify'
import {
    handleCreateRoom,
    handleGetRoom,
    handleUpdateRoom,
} from './handlers/rooms-handlers'

export async function roomsRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: handleCreateRoom,
    })

    fastify.route({
        method: 'PUT',
        url: '/',
        handler: handleUpdateRoom,
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: handleGetRoom,
    })
}
