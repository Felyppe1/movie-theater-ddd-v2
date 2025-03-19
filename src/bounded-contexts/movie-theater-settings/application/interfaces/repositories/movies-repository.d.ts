import { Movie } from '../../../bounded-contexts/movie-theater-settings/domain/core/movie-theater-settings/movie'

export interface MoviesRepository {
    save(movie: Movie): Promise<void>
}
