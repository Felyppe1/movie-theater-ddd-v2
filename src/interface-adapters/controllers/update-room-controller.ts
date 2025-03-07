import { ChairTypesRepository } from '../../application/interfaces/repositories/chair-types-repository'
import { RoomsRepository } from '../../application/interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { UpdateRoomService } from '../../application/services/update-room-service'
import { Controller, Request, Response } from './controller'

export interface UpdateRoomControllerInput {
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export class UpdateRoomController
    implements Controller<UpdateRoomControllerInput>
{
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
    ) {}

    async handle(
        request: Request<UpdateRoomControllerInput>,
        response: Response<undefined>,
    ) {
        const { body, params } = request

        const updateRoomService = new UpdateRoomService(
            this.roomsRepository,
            this.technologiesRepository,
            this.chairTypesRepository,
        )

        await updateRoomService.execute({ ...body!, id: params!.id })

        response.send()
    }
}
