import { ChairTypesRepository } from '../../application/interfaces/repositories/chair-types-repository'
import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { RoomsRepository } from '../../application/interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { CreateRoomService } from '../../application/services/create-room-service'
import { Request, Response } from './controller'

export interface CreateRoomControllerInput {
    movieTheaterId: string
    number: number
    layout: number[][]
    technologyIds: number[]
}

export class CreateRoomController {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(
        request: Request<CreateRoomControllerInput>,
    ): Promise<Response> {
        const createRoomService = new CreateRoomService(
            this.roomsRepository,
            this.chairTypesRepository,
            this.technologiesRepository,
            this.movieTheatersRepository,
        )

        const { body } = request

        await createRoomService.execute(body)

        return { status: 200 }
    }
}
