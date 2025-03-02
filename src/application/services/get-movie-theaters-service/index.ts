import { MovieTheatersRepository } from '../../interfaces/repositories/movie-theaters-repository'

export class GetMovieTheatersService {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async execute() {
        const movieTheaters = await this.movieTheatersRepository.getMany()

        return movieTheaters
    }
}
