import { DatabaseConnector } from '../../interfaces/database/database-connector'
import { MovieTheatersRepository } from '../../interfaces/repositories/movie-theaters-repository'

interface GetMovieTheatersServiceInput {
    offset?: number
    limit?: number
}

export class GetMovieTheatersService {
    constructor(private readonly databaseConnector: DatabaseConnector) {}

    async execute(data: GetMovieTheatersServiceInput) {
        const offset = data.offset ?? 0
        const limit = data.limit ?? 15

        const movieTheaters = await this.databaseConnector.query(
            `
            SELECT
                id,
                json_build_object(
                    'number', number,
                    'complement', complement,
                    'zipCode', "zipCode",
                    'street', street,
                    'city', city,
                    'state', state
                ) address
            FROM movie_theater
            LIMIT $1
            OFFSET $2
        `,
            [limit, offset],
        )

        return {
            items: movieTheaters,
            pagination: {
                offset: offset + limit,
                limit,
            },
        }
    }
}
