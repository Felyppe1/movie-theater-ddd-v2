import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import {
    CreateRoomController,
    CreateRoomControllerInput,
} from '../../../interface-adapters/controllers/create-room-controller'
import { ZodRoomsValidator } from '../../validators/zod/zod-rooms-validator'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from './fastify-response-adapter'

export async function roomsRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const roomsRepository = new PrismaRoomsRepository()
            const chairTypesRepository = new PrismaChairTypesRepository()
            const technologiesRepository = new PrismaTechnologiesRepository()
            const movieTheatersRepository = new PrismaMovieTheatersRepository()
            const roomsValidator = new ZodRoomsValidator()

            const createRoomController = new CreateRoomController(
                roomsRepository,
                chairTypesRepository,
                technologiesRepository,
                movieTheatersRepository,
                roomsValidator,
            )

            const normalizedRequest =
                normalizeFastifyRequest<CreateRoomControllerInput>(request)
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createRoomController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })

    fastify.route({
        method: 'PUT',
        url: '/',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const roomsRepository = new PrismaRoomsRepository()
            const chairTypesRepository = new PrismaChairTypesRepository()
            const technologiesRepository = new PrismaTechnologiesRepository()
            const movieTheatersRepository = new PrismaMovieTheatersRepository()
            const roomsValidator = new ZodRoomsValidator()

            const createRoomController = new CreateRoomController(
                roomsRepository,
                chairTypesRepository,
                technologiesRepository,
                movieTheatersRepository,
                roomsValidator,
            )

            const normalizedRequest =
                normalizeFastifyRequest<CreateRoomControllerInput>(request)
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createRoomController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })
}
