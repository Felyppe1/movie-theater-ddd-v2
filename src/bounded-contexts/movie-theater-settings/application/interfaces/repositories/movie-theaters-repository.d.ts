import { MovieTheater } from '../../../bounded-contexts/movie-theater-settings/domain/core/movie-theater-settings/movie-theater'

export interface MovieTheatersRepository {
    save(movieTheater: MovieTheater): Promise<void>
    getById(id: string): Promise<MovieTheater | null>
    getMany(): Promise<MovieTheater[]>
}
