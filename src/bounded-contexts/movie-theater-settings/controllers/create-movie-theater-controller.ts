import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMovieTheatersRepository } from '../infrastructure/databases/prisma/prisma-movie-theaters-repository'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { CreateMovieTheaterService } from '../application/services/create-movie-theater-service'

export interface CreateMovieTheaterRequestBody {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export interface CreateMovieTheaterResponseBody {
    movieTheaterId: string
}

export async function createMovieTheaterController(
    request: FastifyRequest<{
        Body: CreateMovieTheaterRequestBody
        Reply: CreateMovieTheaterResponseBody
    }>,
    response: FastifyReply<{ Reply: CreateMovieTheaterResponseBody }>,
) {
    const { body } = request

    const schema = z.object({
        number: z.string().min(1),
        complement: z.string().min(1).optional(),
        zipCode: z.string().min(8),
        street: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
    })

    const bodyValidated = Zod.validate({
        schema,
        data: body,
    })

    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createMovieTheaterService = new CreateMovieTheaterService(
        movieTheatersRepository,
    )

    const movieTheaterId =
        await createMovieTheaterService.execute(bodyValidated)

    return await response.status(201).send({ movieTheaterId })
}
