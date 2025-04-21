import { expect, it } from "vitest";
import { GetMovieTheatersService } from "../../src/bounded-contexts/movie-theater-settings/application/services/get-movie-theaters-service";
import { PrismaDatabaseConnector } from "../../src/bounded-contexts/movie-theater-settings/infrastructure/databases/prisma/prisma-connector";
import { PrismaMovieTheatersRepository } from "../../src/bounded-contexts/movie-theater-settings/infrastructure/databases/prisma/prisma-movie-theaters-repository";
import { CreateMovieTheaterService } from "../../src/bounded-contexts/movie-theater-settings/application/services/create-movie-theater-service";

it('Deve poder criar um cinema', async () => {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()
    const databaseConnector = new PrismaDatabaseConnector()
    
    const createMovieTheaterService = new CreateMovieTheaterService(movieTheatersRepository)
    const getMovieTheatersService = new GetMovieTheatersService(databaseConnector)

    const createMovieTheaterInput = {
        number: '1',
        zipCode: '11222333',
        complement: 'Complemento',
        street: 'Rua',
        city: 'Cidade',
        state: 'Estado'
    }
    
    const movieTheaterId = await createMovieTheaterService.execute(createMovieTheaterInput)

    const getMovieTheatersOutput = await getMovieTheatersService.execute({})

    expect(getMovieTheatersOutput).toEqual({
        items: [
            {
                id: movieTheaterId,
                street: {
                    number: '1',
                    zipCode: '11222333',
                    complement: 'Complemento',
                    street: 'Rua',
                    city: 'Cidade',
                    state: 'Estado'
                }
            }
        ],
        pagination: {
            offset: 15,
            limit: 15
        }
    })
})