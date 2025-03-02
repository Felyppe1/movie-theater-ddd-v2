import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRoomsRepository } from '../../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../../databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateRoomController,
    CreateRoomControllerInput,
} from '../../../../interface-adapters/controllers/create-room-controller'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from '../fastify-response-adapter'
import { GetRoomController } from '../../../../interface-adapters/controllers/get-room-controller'
import {
    UpdateRoomController,
    UpdateRoomControllerInput,
} from '../../../../interface-adapters/controllers/update-room-controller'

export async function handleCreateRoom(
    request: FastifyRequest,
    reply: FastifyReply,
) {
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
        normalizeFastifyRequest<CreateRoomControllerInput>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createRoomController.handle(normalizedRequest, fastifyResponseAdapter)
}

export async function handleUpdateRoom(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const roomsRepository = new PrismaRoomsRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createRoomController = new UpdateRoomController(
        roomsRepository,
        technologiesRepository,
        chairTypesRepository,
    )

    const normalizedRequest =
        normalizeFastifyRequest<UpdateRoomControllerInput>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createRoomController.handle(normalizedRequest, fastifyResponseAdapter)
}

export async function handleGetRoom(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const roomsRepository = new PrismaRoomsRepository()

    const getRoomController = new GetRoomController(roomsRepository)

    const normalizedRequest = normalizeFastifyRequest<undefined>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await getRoomController.handle(normalizedRequest, fastifyResponseAdapter)
}
