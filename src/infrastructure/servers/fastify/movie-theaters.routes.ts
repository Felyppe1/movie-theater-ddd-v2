import { FastifyInstance } from 'fastify'
import { getMovieTheatersController } from '../../../controllers/get-movie-theaters-controller'
import { createMovieController } from '../../../controllers/create-movie-controller'

export async function movieTheatersRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: createMovieController,
    })

    fastify.route({
        url: '/',
        method: 'GET',
        handler: getMovieTheatersController,
    })
}
