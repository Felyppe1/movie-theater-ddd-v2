import { FastifyInstance } from 'fastify'
import { createMovieController } from '../../../controllers/create-movie-controller'

export async function moviesRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: createMovieController,
    })
}
