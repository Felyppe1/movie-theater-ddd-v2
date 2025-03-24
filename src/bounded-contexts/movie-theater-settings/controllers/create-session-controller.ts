import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMoviesRepository } from '../infrastructure/databases/prisma/prisma-movies-repository'
import { PrismaRoomsRepository } from '../infrastructure/databases/prisma/prisma-rooms-repository'
import { CreateSessionService } from '../application/services/create-session-service'
import { PrismaSessionsRepository } from '../infrastructure/databases/prisma/prisma-sessions-repository'
import { PrismaTechnologiesRepository } from '../infrastructure/databases/prisma/prisma-technologies-repository'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { PrismaChairTypePricesRepository } from '../infrastructure/databases/prisma/prisma-chair-type-prices-repository'
import { PrismaChairTypesRepository } from '../infrastructure/databases/prisma/prisma-chair-types-repository'

interface CreateSessionRequestBody {
    movieId: string
    roomId: string
    schedule: Date
    isSubtitled: boolean
    technologyId: string
}

interface CreateSessionResponseBody {
    movieSessionId: string
}

export async function createSessionController(
    request: FastifyRequest<{
        Body: CreateSessionRequestBody
        Reply: CreateSessionResponseBody
    }>,
    response: FastifyReply<{ Reply: CreateSessionResponseBody }>,
) {
    const { body } = request

    const schema = z.object({
        movieId: z.string().min(1),
        roomId: z.string().min(1),
        schedule: z.coerce.date(),
        isSubtitled: z.boolean(),
        technologyId: z.string().min(1),
    })

    const bodyValidated = Zod.validate({ schema, data: body })

    const sessionsRepository = new PrismaSessionsRepository()
    const moviesRepository = new PrismaMoviesRepository()
    const roomsRepository = new PrismaRoomsRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()
    const chairTypePricesRepository = new PrismaChairTypePricesRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()

    const createMovieSessionService = new CreateSessionService(
        sessionsRepository,
        moviesRepository,
        roomsRepository,
        technologiesRepository,
        chairTypePricesRepository,
        chairTypesRepository,
    )

    const movieSessionId =
        await createMovieSessionService.execute(bodyValidated)

    return response.status(201).send({ movieSessionId })
}
