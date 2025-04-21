import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidDataError } from '../../../shared/domain/errors/invalid-data-error'
import { GetRoomService } from '../application/services/get-room-service'
import { PrismaDatabaseConnector } from '../infrastructure/databases/prisma/prisma-connector'

interface GetRoomRequestParams {
    id: string
}

export interface GetRoomResponseBody {
    id: string
    movieTheaterId: string
    number: number
    rowLength: number
    columnLength: number
    chairs: {
        row: number
        column: number
        chairTypeId: number
    }
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

    const databaseConnector = new PrismaDatabaseConnector()

    const getRoomService = new GetRoomService(databaseConnector)

    const room = await getRoomService.execute(params.id)

    return await response.status(200).send(room)
}
