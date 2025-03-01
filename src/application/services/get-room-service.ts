import { RoomsRepository } from '../interfaces/repositories/rooms-repository'

export class GetRoomService {
    constructor(private readonly roomsRepository: RoomsRepository) {}

    async execute(id: string) {
        const room = await this.roomsRepository.getById(id)

        if (!room) {
            throw Error(`Room id ${id} not found`)
        }

        return room.export()
    }
}
