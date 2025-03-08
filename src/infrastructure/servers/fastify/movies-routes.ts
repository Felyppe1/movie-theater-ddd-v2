import { FastifyInstance } from 'fastify'
import { handleCreateMovie } from './handlers/movies-handlers'

export async function moviesRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: handleCreateMovie,
    })
}
