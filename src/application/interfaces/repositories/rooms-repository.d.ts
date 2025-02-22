import { Room } from '../../../domain/core/movie-theater-settings/room'

export interface GetOneInput {
    number: number
    movieTheaterId: string
}

export interface NumberExistsInTheater {
    number: number
    movieTheaterId: string
}

export interface RoomsRepository {
    save(room: Room): Promise<void>
    getOne(data: GetOneInput): Promise<Room | null>
    numberExistsInTheater(data: NumberExistsInTheater): Promise<boolean>
}
