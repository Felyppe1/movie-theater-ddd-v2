import { MovieTheater } from '../../../domain/core/movie-theater-settings/movie-theater'
import { MovieTheatersRepository } from '../../interfaces/repositories/movie-theaters-repository'
import { CreateMovieTheaterServiceInput } from './create-movie-theater-service-input'

export class CreateMovieTheaterService {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async execute(data: CreateMovieTheaterServiceInput) {
        const movieTheater = MovieTheater.create(data)

        await this.movieTheatersRepository.save(movieTheater)

        return movieTheater.getId()
    }
}
