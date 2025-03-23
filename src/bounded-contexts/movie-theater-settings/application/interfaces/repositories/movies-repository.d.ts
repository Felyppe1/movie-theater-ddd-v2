import { Movie } from '../../../domain/core/movie'

export interface MoviesRepository {
    save(movie: Movie): Promise<void>
    getById(id: string): Promise<Movie | null>
}
