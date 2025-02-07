import { Room } from "../domain/core/movie-theater-settings/room";
import { ChairTypesRepository } from "./chair-types-repository";
import { RoomsRepository } from "./rooms-respository";
import { TechnologiesRepository } from "./technologies-repository";

interface CreateRoomInput {
    movieTheaterId: string
    number: number
    layout: number[][]
    technologyIds: number[]
}

export class CreateRoom {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async execute(data: CreateRoomInput) {
        const chairTypes = await this.chairTypesRepository.getAll()
        const technologies = await this.technologiesRepository.getAll()

        const existentChairTypeIds = chairTypes.map(chairType => chairType.id)
        const existentTechnologyIds = technologies.map(technology => technology.id)

        for (let row = 0; row < data.layout.length; row++) {
            for (let column = 0; column < data.layout[row].length; column++) {
                const chairTypeId = data.layout[row][column]
                
                if (chairTypeId === null) continue

                const chairTypeExists = existentChairTypeIds.includes(chairTypeId)

                if (!chairTypeExists) {
                    throw Error(`Chair type id ${chairTypeId} does not exist`)
                }
            }
        }

        const technologyDoesNotExist = data.technologyIds.find(technology => !existentTechnologyIds.includes(technology))
        
        if (technologyDoesNotExist) {
            throw Error(`Technology id ${technologyDoesNotExist} does not exist`)
        }

        const newRoom = Room.create(data)

        await this.roomsRepository.save(newRoom)
    }
}