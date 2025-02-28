import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from './fastify-response-adapter'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chair-types-repository'
import {
    CreateChairTypeController,
    CreateChairTypeControllerInput,
} from '../../../interface-adapters/controllers/create-chair-type-controller'

export async function chairTypesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const chairTypesRepository = new PrismaChairTypesRepository()

            const createChairTypesController = new CreateChairTypeController(
                chairTypesRepository,
            )

            const normalizedRequest =
                normalizeFastifyRequest<CreateChairTypeControllerInput>(request)
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createChairTypesController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })
}
