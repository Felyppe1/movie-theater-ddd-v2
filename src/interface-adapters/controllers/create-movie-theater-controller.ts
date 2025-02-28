import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { CreateMovieTheaterService } from '../../application/services/create-movie-theater-service'
import { Controller, Request, Response } from './controller'

export interface CreateMovieTheaterControllerInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export interface CreateMovieTheaterControllerOutput {
    movieTheaterId: string
}

export interface CreateMovieTheaterControllerOutput {
    movieTheaterId: string
}

export class CreateMovieTheaterController
    implements
        Controller<
            CreateMovieTheaterControllerInput,
            CreateMovieTheaterControllerOutput
        >
{
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async handle(
        request: Request<CreateMovieTheaterControllerInput>,
        response: Response<CreateMovieTheaterControllerOutput>,
    ) {
        const { body } = request

        const createMovieTheaterService = new CreateMovieTheaterService(
            this.movieTheatersRepository,
        )

        const movieTheaterId = await createMovieTheaterService.execute(body!)

        response.status(201).body({ movieTheaterId }).send()
    }
}
