import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chairs-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
    CreateRoomController,
    CreateRoomControllerInput,
} from '../../../interface-adapters/controllers/create-room-controller'
import fastifyCookie from 'fastify-cookie'
import { FastifyResponseAdapter } from './fastify-response-adapter'

export async function router(fastify: FastifyInstance) {
    fastify.register(fastifyCookie)

    fastify.route({
        method: 'POST',
        url: '/rooms',
        handler: async (
            request: FastifyRequest<{ Body: CreateRoomControllerInput }>,
            reply: FastifyReply,
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

            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createRoomController.handle(
                {
                    body: request.body,
                },
                fastifyResponseAdapter,
            )
        },
    })
}
