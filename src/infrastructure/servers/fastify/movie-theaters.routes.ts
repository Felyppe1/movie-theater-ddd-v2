import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateMovieTheaterController,
    CreateMovieTheaterControllerInput,
} from '../../../interface-adapters/controllers/create-movie-theater-controller'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from './fastify-response-adapter'
import { GetMovieTheatersController } from '../../../interface-adapters/controllers/get-movie-theaters-controller'

export async function movieTheatersRoutes(fastify: FastifyInstance) {
    fastify.route({
        url: '/',
        method: 'POST',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const movieTheatersRepository = new PrismaMovieTheatersRepository()

            const createMovieTheaterController =
                new CreateMovieTheaterController(movieTheatersRepository)

            const normalizedRequest =
                normalizeFastifyRequest<CreateMovieTheaterControllerInput>(
                    request,
                )
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createMovieTheaterController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })

    fastify.route({
        url: '/',
        method: 'GET',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const movieTheatersRepository = new PrismaMovieTheatersRepository()

            const getMovieTheatersController = new GetMovieTheatersController(
                movieTheatersRepository,
            )

            const normalizedRequest = normalizeFastifyRequest(request)
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await getMovieTheatersController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })
}
