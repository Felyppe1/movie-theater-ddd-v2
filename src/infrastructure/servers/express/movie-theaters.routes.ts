import { Router } from 'express'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateMovieTheaterController,
    CreateMovieTheaterControllerInput,
} from '../../../interface-adapters/controllers/create-movie-theater-controller'
import {
    ExpressResponseAdapter,
    normalizeExpressRequest,
} from './express-adapters'
import { GetMovieTheatersController } from '../../../interface-adapters/controllers/get-movie-theaters-controller'

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', async (req, res) => {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createMovieTheaterController = new CreateMovieTheaterController(
        movieTheatersRepository,
    )

    const normalizedRequest =
        normalizeExpressRequest<CreateMovieTheaterControllerInput>(req)
    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createMovieTheaterController.handle(
        normalizedRequest,
        expressResponseAdapter,
    )
})

movieTheatersRoutes.get('/', async (req, res) => {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const getMovieTheatersController = new GetMovieTheatersController(
        movieTheatersRepository,
    )

    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await getMovieTheatersController.handle({}, expressResponseAdapter)
})
