import { MovieTheater } from '../../domain/core/movie-theater'
import { MovieTheatersRepository } from '../interfaces/repositories/movie-theaters-repository'

interface CreateMovieTheaterInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class CreateMovieTheaterService {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async execute(data: CreateMovieTheaterInput) {
        const movieTheater = MovieTheater.create(data)

        await this.movieTheatersRepository.save(movieTheater)

        return movieTheater.getId()
    }
}
