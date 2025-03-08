import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMovieTheatersRepository } from '../../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateMovieTheaterController,
    CreateMovieTheaterControllerInput,
} from '../../../../interface-adapters/controllers/create-movie-theater-controller'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from '../fastify-adapters'
import { GetMovieTheatersController } from '../../../../interface-adapters/controllers/get-movie-theaters-controller'

export async function handleCreateMovieTheater(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createMovieTheaterController = new CreateMovieTheaterController(
        movieTheatersRepository,
    )

    const normalizedRequest =
        await normalizeFastifyRequest<CreateMovieTheaterControllerInput>(
            request,
        )
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createMovieTheaterController.handle(
        normalizedRequest,
        fastifyResponseAdapter,
    )
}

export async function handleGetMovieTheater(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const getMovieTheatersController = new GetMovieTheatersController(
        movieTheatersRepository,
    )

    const normalizedRequest = await normalizeFastifyRequest(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await getMovieTheatersController.handle(
        normalizedRequest,
        fastifyResponseAdapter,
    )
}
