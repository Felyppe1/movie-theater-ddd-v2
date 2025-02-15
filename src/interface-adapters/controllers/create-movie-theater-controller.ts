import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { CreateMovieTheaterService } from '../../application/services/create-movie-theater'
import { Request, Response } from './controller'

export interface CreateMovieTheaterControllerInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class CreateMovieTheaterController {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(
        request: Request<CreateMovieTheaterControllerInput>,
    ): Promise<Response<string>> {
        const { body } = request

        const createMovieTheaterService = new CreateMovieTheaterService(
            this.movieTheatersRepository,
        )

        const movieTheaterId = await createMovieTheaterService.execute(body)

        return { status: 201, body: movieTheaterId }
    }
}
