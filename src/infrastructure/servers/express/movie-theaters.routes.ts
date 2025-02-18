import { Router } from 'express'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import { CreateMovieTheaterController } from '../../../interface-adapters/controllers/create-movie-theater-controller'
import { ExpressResponseAdapter } from './express-response-adapter'

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', async (req, res) => {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createMovieTheaterController = new CreateMovieTheaterController(
        movieTheatersRepository,
    )

    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createMovieTheaterController.handle(
        {
            body: req.body,
        },
        expressResponseAdapter,
    )
})
