import { Controller, Request, Response } from './controller'
import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { GetMovieTheatersService } from '../../application/services/get-movie-theaters-service'
import { MovieTheater } from '../../domain/core/movie-theater-settings/movie-theater'

export interface GetMovieTheatersControllerOutput {
    items: MovieTheater[]
}

export class GetMovieTheatersController
    implements Controller<undefined, GetMovieTheatersControllerOutput>
{
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(
        _: Request,
        response: Response<GetMovieTheatersControllerOutput>,
    ) {
        const getMovieTheatersService = new GetMovieTheatersService(
            this.movieTheatersRepository,
        )

        const movieTheaters = await getMovieTheatersService.execute()

        response.body({ items: movieTheaters }).send()
    }
}
