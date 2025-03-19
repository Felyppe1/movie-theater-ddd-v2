import { ConflictError } from '../../../../../shared/domain/errors/conflict-error'
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'
import { Room } from '../../../domain/core/room'
import { ChairTypesRepository } from '../../interfaces/repositories/chair-types-repository'
import { MovieTheatersRepository } from '../../interfaces/repositories/movie-theaters-repository'
import { RoomsRepository } from '../../interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'

interface CreateRoomServiceInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export class CreateRoomService {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async execute(data: CreateRoomServiceInput) {
        const movieTheater = await this.movieTheatersRepository.getById(
            data.movieTheaterId,
        )

        if (!movieTheater) {
            throw new NotFoundError(
                `Movie theater id ${data.movieTheaterId} was not found`,
            )
        }

        const roomNumberExistsInTheater =
            await this.roomsRepository.numberExistsInTheater({
                movieTheaterId: data.movieTheaterId,
                number: data.number,
            })

        if (roomNumberExistsInTheater) {
            throw new ConflictError(
                `Movie theater already has a room with number ${data.number}`,
            )
        }

        const chairTypes = await this.chairTypesRepository.getAll()
        const technologies = await this.technologiesRepository.getAll()

        const existentChairTypeIds = chairTypes.map(chairType =>
            chairType.getId(),
        )
        const existentTechnologyIds = technologies.map(technology =>
            technology.getId(),
        )

        for (let row = 0; row < data.layout.length; row++) {
            for (let column = 0; column < data.layout[row].length; column++) {
                const chairTypeId = data.layout[row][column]

                if (chairTypeId === null) continue

                const chairTypeExists =
                    existentChairTypeIds.includes(chairTypeId)

                if (!chairTypeExists) {
                    throw new NotFoundError(
                        `Chair type id ${chairTypeId} was not found`,
                    )
                }
            }
        }

        const technologyDoesNotExist = data.technologyIds.find(
            technology => !existentTechnologyIds.includes(technology),
        )

        if (technologyDoesNotExist) {
            throw new NotFoundError(
                `Technology id ${technologyDoesNotExist} was not found`,
            )
        }

        const newRoom = Room.create(data)

        await this.roomsRepository.save(newRoom)

        return newRoom.getId()
    }
}
