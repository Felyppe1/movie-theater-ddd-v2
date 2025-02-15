import { Router } from 'express'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import { CreateMovieTheaterController } from '../../../interface-adapters/controllers/create-movie-theater-controller'

export const movieTheatersRoutes = Router()

movieTheatersRoutes.post('/', async (req, res) => {
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createMovieTheaterController = new CreateMovieTheaterController(
        movieTheatersRepository,
    )

    const response = await createMovieTheaterController.handle({
        body: req.body,
    })

    res.status(response.status).json(response.body)
})
