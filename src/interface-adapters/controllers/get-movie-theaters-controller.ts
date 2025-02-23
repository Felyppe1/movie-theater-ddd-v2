import { Controller, Request, Response } from './controller'
import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { GetMovieTheatersService } from '../../application/services/get-movie-theaters-service'

export class GetMovieTheatersController implements Controller {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(_: Request, response: Response) {
        const getMovieTheatersService = new GetMovieTheatersService(
            this.movieTheatersRepository,
        )

        const movieTheaters = await getMovieTheatersService.execute()

        response.body({ items: movieTheaters }).send()
    }
}
