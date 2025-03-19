import { FastifyInstance } from 'fastify'
import { getMovieTheatersController } from '../../../controllers/get-movie-theaters-controller'
import { createMovieTheaterController } from '../../../controllers/create-movie-theater-controller'

export async function movieTheatersRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: createMovieTheaterController,
    })

    fastify.route({
        url: '/',
        method: 'GET',
        handler: getMovieTheatersController,
    })
}
