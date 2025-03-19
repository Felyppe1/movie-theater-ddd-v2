import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRoomsRepository } from '../infrastructure/databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../infrastructure/databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../infrastructure/databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../infrastructure/databases/prisma/prisma-movie-theaters-repository'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { CreateRoomService } from '../application/services/create-room-service'

export interface CreateRoomControllerInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export interface CreateRoomControllerOutput {
    roomId: string
}

export async function createRoomController(
    request: FastifyRequest<{
        Body: CreateRoomControllerInput
        Reply: CreateRoomControllerOutput
    }>,
    response: FastifyReply<{ Reply: CreateRoomControllerOutput }>,
) {
    const { body } = request

    const schema = z.object({
        movieTheaterId: z.string().min(1),
        number: z.number(),
        layout: z.array(z.array(z.string().min(1).nullable())),
        technologyIds: z.array(z.string().min(1)),
    })

    const bodyValidated = Zod.validate({ schema, data: body })

    const roomsRepository = new PrismaRoomsRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createRoomService = new CreateRoomService(
        roomsRepository,
        chairTypesRepository,
        technologiesRepository,
        movieTheatersRepository,
    )

    const roomId = await createRoomService.execute(bodyValidated)

    return await response.status(200).send({ roomId })
}
