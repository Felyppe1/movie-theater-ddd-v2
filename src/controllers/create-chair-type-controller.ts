import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaChairTypesRepository } from '../infrastructure/databases/prisma/prisma-chair-types-repository'
import { CreateChairTypeService } from '../application/services/create-chair-type-service'
import { InvalidDataError } from '../domain/errors/invalid-data-error'

interface CreateChairTypeRequestBody {
    name: string
}

interface CreateChairTypeResponseBody {
    chairTypeId: string
}

export async function createChairTypeController(
    request: FastifyRequest<{
        Body: CreateChairTypeRequestBody
        Reply: CreateChairTypeResponseBody
    }>,
    response: FastifyReply<{ Reply: CreateChairTypeResponseBody }>,
) {
    const { body } = request

    if (!body.name) throw new InvalidDataError('name: Required')

    const chairTypesRepository = new PrismaChairTypesRepository()

    const createChairTypeService = new CreateChairTypeService(
        chairTypesRepository,
    )

    const chairTypeId = await createChairTypeService.execute(body)

    return await response.status(201).send({ chairTypeId })
}
