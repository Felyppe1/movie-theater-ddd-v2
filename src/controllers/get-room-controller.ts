import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRoomsRepository } from '../infrastructure/databases/prisma/prisma-rooms-repository'
import { GetRoomService } from '../application/services/get-room-service'
import { InvalidDataError } from '../domain/errors/invalid-data-error'

interface GetRoomRequestParams {
    id: string
}

export interface GetRoomResponseBody {
    id: string
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export async function getRoomController(
    request: FastifyRequest<{
        Reply: GetRoomResponseBody
        Params: GetRoomRequestParams
    }>,
    response: FastifyReply<{ Reply: GetRoomResponseBody }>,
) {
    const { params } = request

    if (!params.id) throw new InvalidDataError('Parameter id is required')

    const roomsRepository = new PrismaRoomsRepository()

    const getRoomService = new GetRoomService(roomsRepository)

    const room = await getRoomService.execute(params.id)

    return await response.status(200).send(room)
}
