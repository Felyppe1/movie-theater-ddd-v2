import { NotFoundError } from '../../domain/errors/not-found-error'
import { RoomsRepository } from '../interfaces/repositories/rooms-repository'

export class GetRoomService {
    constructor(private readonly roomsRepository: RoomsRepository) {}

    async execute(id: string) {
        const room = await this.roomsRepository.getById(id)

        if (!room) {
            throw new NotFoundError(`Room id ${id} was not found`)
        }

        return room.export()
    }
}
