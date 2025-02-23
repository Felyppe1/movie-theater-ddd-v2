import { Room } from '../../../domain/core/movie-theater-settings/room'

export interface NumberExistsInTheater {
    number: number
    movieTheaterId: string
}

export interface RoomsRepository {
    save(room: Room): Promise<void>
    getById(id: string): Promise<Room | null>
    numberExistsInTheater(data: NumberExistsInTheater): Promise<boolean>
    update(room: Room): Promise<void>
}
