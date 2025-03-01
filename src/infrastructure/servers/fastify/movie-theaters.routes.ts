import { FastifyInstance } from 'fastify'
import {
    handleCreateMovieTheater,
    handleGetMovieTheater,
} from './handlers/movie-theaters-handlers'

export async function movieTheatersRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: handleCreateMovieTheater,
    })

    fastify.route({
        url: '/',
        method: 'GET',
        handler: handleGetMovieTheater,
    })
}
