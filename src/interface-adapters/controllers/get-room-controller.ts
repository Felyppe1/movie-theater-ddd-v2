import { RoomsRepository } from '../../application/interfaces/repositories/rooms-repository'
import { GetRoomService } from '../../application/services/get-room-service'
import { Controller, Request, Response } from './controller'

export interface GetRoomControllerOutput {
    id: string
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export class GetRoomController
    implements Controller<undefined, GetRoomControllerOutput>
{
    constructor(private readonly roomsRepository: RoomsRepository) {}

    async handle(
        request: Request<undefined>,
        response: Response<GetRoomControllerOutput>,
    ): Promise<void> {
        const params = request.params

        const getRoomService = new GetRoomService(this.roomsRepository)

        const room = await getRoomService.execute(params!.id)

        response.body(room).send()
    }
}
