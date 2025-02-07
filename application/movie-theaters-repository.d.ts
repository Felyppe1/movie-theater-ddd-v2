import { MovieTheater } from "../domain/core/movie-theater-settings/movie-theater";

interface HasRoomWithNumberInput {
    id: string
    roomNumber: number
}

export interface MovieTheatersRepository {
    save(movieTheater: MovieTheater): Promise<void>
    getById(id: string): Promise<MovieTheater | null>
    hasRoomWithNumber(data: HasRoomWithNumberInput): Promise<boolean>
}