import { FastifyReply, FastifyRequest } from 'fastify'
import {
    CreateMovieController,
    CreateMovieControllerInput,
} from '../../../../interface-adapters/controllers/create-movie-controller'
import { PrismaMoviesRepository } from '../../../databases/prisma/prisma-movies-repository'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from '../fastify-adapters'
import { GCPBucket } from '../../../clouds/gcp/gcp-bucket'

export async function handleCreateMovie(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const moviesRepository = new PrismaMoviesRepository()
    const gcpBucket = new GCPBucket()

    const createMovieController = new CreateMovieController(
        moviesRepository,
        gcpBucket,
    )

    const normalizedRequest =
        await normalizeFastifyRequest<CreateMovieControllerInput>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createMovieController.handle(
        normalizedRequest,
        fastifyResponseAdapter,
    )
}
