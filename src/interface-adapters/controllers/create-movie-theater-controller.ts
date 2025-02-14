import { ChairTypesRepository } from "../../application/interfaces/repositories/chair-types-repository";
import { MovieTheatersRepository } from "../../application/interfaces/repositories/movie-theaters-repository";
import { CreateMovieTheaterService } from "../../application/services/create-movie-theater";
import { Request, Response } from "./controller";

interface CreateMovieTheaterInput {
    chairs: {
      id: number;
      value: number;
    }[];
    number: string;
    complement?: string;
    zipCode: string;
    street: string;
    city: string;
    state: string;
}

export class CreateMovieTheaterController {
    constructor(
        private readonly movieTheatersRepository: MovieTheatersRepository,
        private readonly chairTypesRepository: ChairTypesRepository
    ) {}

    async handle(request: Request<CreateMovieTheaterInput>): Promise<Response<string>> {
        const { body } = request

        const createMovieTheaterService = new CreateMovieTheaterService(
            this.movieTheatersRepository,
            this.chairTypesRepository
        )

        const movieTheaterId = await createMovieTheaterService.execute(body)

        return { status: 201, body: movieTheaterId }
    }
}