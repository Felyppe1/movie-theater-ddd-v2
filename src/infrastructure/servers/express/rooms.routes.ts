import { Router } from 'express'
import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import { CreateRoomController } from '../../../interface-adapters/controllers/create-room-controller'
import { ExpressResponseAdapter } from './express-response-adapter'
import { UpdateRoomController } from '../../../interface-adapters/controllers/update-room-controller'

export const roomsRouter = Router()

roomsRouter.post('/', async (req, res) => {
    const roomsRepository = new PrismaRoomsRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()
    const movieTheatersRepository = new PrismaMovieTheatersRepository()

    const createRoomController = new CreateRoomController(
        roomsRepository,
        chairTypesRepository,
        technologiesRepository,
        movieTheatersRepository,
    )

    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createRoomController.handle(
        {
            body: req.body,
        },
        expressResponseAdapter,
    )
})

roomsRouter.put('/:id', async (req, res) => {
    const roomsRepository = new PrismaRoomsRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createRoomController = new UpdateRoomController(
        roomsRepository,
        technologiesRepository,
        chairTypesRepository,
    )

    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createRoomController.handle(
        {
            body: req.body,
            params: req.params,
        },
        expressResponseAdapter,
    )
})
