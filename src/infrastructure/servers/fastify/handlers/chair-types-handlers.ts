import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaChairTypesRepository } from '../../../databases/prisma/prisma-chair-types-repository'
import {
    CreateChairTypeController,
    CreateChairTypeControllerInput,
} from '../../../../interface-adapters/controllers/create-chair-type-controller'
import {
    FastifyResponseAdapter,
    normalizeFastifyRequest,
} from '../fastify-adapters'

export async function handleCreateChairType(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const chairTypesRepository = new PrismaChairTypesRepository()

    const createChairTypesController = new CreateChairTypeController(
        chairTypesRepository,
    )

    const normalizedRequest =
        await normalizeFastifyRequest<CreateChairTypeControllerInput>(request)
    const fastifyResponseAdapter = new FastifyResponseAdapter(reply)

    await createChairTypesController.handle(
        normalizedRequest,
        fastifyResponseAdapter,
    )
}
