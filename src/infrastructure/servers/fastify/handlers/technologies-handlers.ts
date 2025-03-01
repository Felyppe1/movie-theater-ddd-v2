import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaTechnologiesRepository } from '../../../databases/prisma/prisma-technologies-repository'
import {
    CreateTechnologyController,
    CreateTechnologyControllerInput,
} from '../../../../interface-adapters/controllers/create-technology-controller'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from '../fastify-response-adapter'

export async function handleCreateTechnology(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createTechnologyController = new CreateTechnologyController(
        technologiesRepository,
    )

    const normalizedRequest =
        normalizeFastifyRequest<CreateTechnologyControllerInput>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createTechnologyController.handle(
        normalizedRequest,
        fastifyResponseAdapter,
    )
}
