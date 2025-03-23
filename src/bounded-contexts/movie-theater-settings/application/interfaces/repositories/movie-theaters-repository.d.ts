import { MovieTheater } from '../../../domain/core/movie-theater'

export interface MovieTheatersRepository {
    save(movieTheater: MovieTheater): Promise<void>
    getById(id: string): Promise<MovieTheater | null>
    getMany(): Promise<MovieTheater[]>
}
