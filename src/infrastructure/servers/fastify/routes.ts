import { FastifyInstance } from 'fastify'
import { movieTheatersRoutes } from './movie-theaters.routes'
import { roomsRoutes } from './rooms.routes'
import { technologiesRoutes } from './technologies.routes'
import { chairTypesRoutes } from './chair-types.routes'

export async function routes(fastify: FastifyInstance) {
    fastify.register(movieTheatersRoutes, { prefix: '/movie-theaters' })
    fastify.register(roomsRoutes, { prefix: '/rooms' })
    fastify.register(technologiesRoutes, { prefix: '/technologies' })
    fastify.register(chairTypesRoutes, { prefix: '/chair-types' })
}
