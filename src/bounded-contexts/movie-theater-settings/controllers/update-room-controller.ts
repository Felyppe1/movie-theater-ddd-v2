import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRoomsRepository } from '../infrastructure/databases/prisma/prisma-rooms-repository'
import { PrismaTechnologiesRepository } from '../infrastructure/databases/prisma/prisma-technologies-repository'
import { PrismaChairTypesRepository } from '../infrastructure/databases/prisma/prisma-chair-types-repository'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { UpdateRoomService } from '../application/services/update-room-service'

export interface UpdateRoomControllerInput {
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export interface UpdateRoomControllerParamsRequest {
    id: string
}

export async function updateRoomController(
    request: FastifyRequest<{
        Body: UpdateRoomControllerInput
        Params: UpdateRoomControllerParamsRequest
    }>,
    response: FastifyReply,
) {
    const { body, params } = request

    const schema = z.object({
        id: z.string().min(1),
        number: z.number(),
        layout: z.array(z.array(z.string().min(1).nullable())),
        technologyIds: z.array(z.string().min(1)),
    })

    const validatedData = Zod.validate({
        schema,
        data: {
            ...body,
            id: params.id,
        },
    })

    const roomsRepository = new PrismaRoomsRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()

    const updateRoomService = new UpdateRoomService(
        roomsRepository,
        technologiesRepository,
        chairTypesRepository,
    )

    await updateRoomService.execute(validatedData)

    return await response.status(200).send()
}
