import { FastifyInstance } from 'fastify'
import { movieTheatersRoutes } from './movie-theaters.routes'
import { roomsRoutes } from './rooms.routes'
import { technologiesRoutes } from './technologies.routes'
import { chairTypesRoutes } from './chair-types.routes'
import { moviesRoutes } from './movies.routes'
import { sessionsRoutes } from './sessions.routes'
import { chairTypePricesRoutes } from './chair-type-prices.routes'

export async function movieTheaterSettingsRoutes(fastify: FastifyInstance) {
    fastify.register(movieTheatersRoutes, { prefix: '/movie-theaters' })
    fastify.register(roomsRoutes, { prefix: '/rooms' })
    fastify.register(technologiesRoutes, { prefix: '/technologies' })
    fastify.register(chairTypesRoutes, { prefix: '/chair-types' })
    fastify.register(moviesRoutes, { prefix: '/movies' })
    fastify.register(sessionsRoutes, { prefix: '/sessions' })
    fastify.register(chairTypePricesRoutes, { prefix: '/chair-type-prices' })
}
