import { Router } from 'express'
import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateRoomController,
    CreateRoomControllerInput,
} from '../../../interface-adapters/controllers/create-room-controller'
import {
    ExpressResponseAdapter,
    normalizeExpressRequest,
} from './express-adapters'
import {
    UpdateRoomController,
    UpdateRoomControllerInput,
} from '../../../interface-adapters/controllers/update-room-controller'

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

    const normalizedRequest =
        normalizeExpressRequest<CreateRoomControllerInput>(req)
    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createRoomController.handle(normalizedRequest, expressResponseAdapter)
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

    const normalizedRequest =
        normalizeExpressRequest<UpdateRoomControllerInput>(req)
    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createRoomController.handle(normalizedRequest, expressResponseAdapter)
})
