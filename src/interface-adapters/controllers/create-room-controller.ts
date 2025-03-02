import { ChairTypesRepository } from '../../application/interfaces/repositories/chair-types-repository'
import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { RoomsRepository } from '../../application/interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { CreateRoomService } from '../../application/services/create-room-service'
import { Controller, Request, Response } from './controller'

export interface CreateRoomControllerInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export interface CreateRoomControllerOutput {
    roomId: string
}

export class CreateRoomController
    implements Controller<CreateRoomControllerInput, CreateRoomControllerOutput>
{
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(
        request: Request<CreateRoomControllerInput>,
        response: Response<CreateRoomControllerOutput>,
    ) {
        const createRoomService = new CreateRoomService(
            this.roomsRepository,
            this.chairTypesRepository,
            this.technologiesRepository,
            this.movieTheatersRepository,
        )

        const { body } = request

        const roomId = await createRoomService.execute(body!)

        response.status(201).body({ roomId }).send()
    }
}
