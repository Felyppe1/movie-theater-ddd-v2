import { Movie } from '../../../domain/core/movie-theater-settings/movie'

export interface MoviesRepository {
    save(movie: Movie): Promise<void>
}
