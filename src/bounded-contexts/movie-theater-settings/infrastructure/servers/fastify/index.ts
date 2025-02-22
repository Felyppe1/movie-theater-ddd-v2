import { FastifyInstance } from 'fastify'
import { roomsRoutes } from './rooms.routes'

export function movieTheaterSettingsRoutes(fastify: FastifyInstance) {
    fastify.register(roomsRoutes, { prefix: '/rooms' })
}
