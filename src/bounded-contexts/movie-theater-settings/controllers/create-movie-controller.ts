import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMoviesRepository } from '../infrastructure/databases/prisma/prisma-movies-repository'
import { CLASSIFICATION, GENDER } from '../domain/core/movie'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { GCPBucket } from '../../../shared/infrastructure/clouds/gcp/gcp-bucket'
import { CreateMovieService } from '../application/services/create-movie-service'
import { GCPPubSub } from '../../../shared/infrastructure/clouds/gcp/gcp-pubsub'

export interface CreateMovieRequestBody {
    name: string
    synopsis: string
    duration: number
    subtitled: boolean
    genders: GENDER[]
    classification: CLASSIFICATION
    technologyIds: string[]
    initialDate: Date
    finalDate: Date
    poster: string
}

export interface CreateMovieResponseBody {
    movieId: string
}

export async function createMovieController(
    request: FastifyRequest<{
        Body: CreateMovieRequestBody
        Reply: CreateMovieResponseBody
    }>,
    response: FastifyReply<{ Reply: CreateMovieResponseBody }>,
) {
    const { body } = request

    const { poster, ...bodyValidated } = Zod.validate({
        schema,
        data: body,
    })

    const moviesRepository = new PrismaMoviesRepository()
    const bucket = new GCPBucket()
    const pubsub = new GCPPubSub()

    const createMovieService = new CreateMovieService(
        moviesRepository,
        bucket,
        pubsub,
    )

    const movieId = await createMovieService.execute({
        ...bodyValidated,
        base64Poster: poster,
    })

    return await response.status(201).send({ movieId })
}

const schema = z.object({
    name: z.string(),
    synopsis: z.string(),
    duration: z.coerce.number(),
    subtitled: z.coerce.boolean(),
    genders: z.array(z.enum([GENDER.ACTION, GENDER.COMEDY, GENDER.HORROR])),
    classification: z.enum([CLASSIFICATION.L, CLASSIFICATION.TWELVE]),
    technologyIds: z.array(z.string()),
    initialDate: z.coerce.date(),
    finalDate: z.coerce.date(),
    poster: z.string(),
})
