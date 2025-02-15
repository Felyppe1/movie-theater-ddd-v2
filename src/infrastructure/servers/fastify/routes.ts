import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chairs-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import { FastifyInstance, FastifyRequest } from 'fastify'
import {
    CreateRoomController,
    CreateRoomControllerInput,
} from '../../../interface-adapters/controllers/create-room-controller'

export async function router(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (
            request: FastifyRequest<{ Body: CreateRoomControllerInput }>,
            reply,
        ) => {
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

            const response = await createRoomController.handle({
                body: request.body,
            })

            return reply.status(response.status).send()
        },
    })
}
