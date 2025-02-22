import { Room } from '../../../domain/core/room'

export interface GetOneInput {
    number: number
    movieTheaterId: string
}

export interface RoomsRepository {
    save(room: Room): Promise<void>
    getOne(data: GetOneInput): Promise<Room | null>
}
