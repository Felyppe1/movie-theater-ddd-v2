import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from './fastify-response-adapter'
import {
    CreateTechnologyController,
    CreateTechnologyControllerInput,
} from '../../../interface-adapters/controllers/create-technology-controller'

export async function technologiesRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const technologiesRepository = new PrismaTechnologiesRepository()

            const createTechnologyController = new CreateTechnologyController(
                technologiesRepository,
            )

            const normalizedRequest =
                normalizeFastifyRequest<CreateTechnologyControllerInput>(
                    request,
                )
            const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

            await createTechnologyController.handle(
                normalizedRequest,
                fastifyResponseAdapter,
            )
        },
    })
}
