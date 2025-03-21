import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMovieTheatersRepository } from '../infrastructure/databases/prisma/prisma-movie-theaters-repository'
import { MovieTheater } from '../domain/core/movie-theater'
import { GetMovieTheatersService } from '../application/services/get-movie-theaters-service'

export interface GetMovieTheatersResponseBody {
    items: MovieTheater[]
}

export async function getMovieTheatersController(
    request: FastifyRequest<{ Reply: GetMovieTheatersResponseBody }>,
    response: FastifyReply<{ Reply: GetMovieTheatersResponseBody }>,
) {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const getMovieTheatersService = new GetMovieTheatersService(
        movieTheatersRepository,
    )

    const movieTheaters = await getMovieTheatersService.execute()

    return await response.status(200).send({ items: movieTheaters })
}
