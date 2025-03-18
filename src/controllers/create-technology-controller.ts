import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaTechnologiesRepository } from '../infrastructure/databases/prisma/prisma-technologies-repository'
import { CreateTechnologyService } from '../application/services/create-technology-service'
import { InvalidDataError } from '../domain/errors/invalid-data-error'

export interface CreateTechnologyRequestBody {
    name: string
}

export interface CreateTechnologyResponseBody {
    technologyId: string
}

export async function createTechnologyController(
    request: FastifyRequest<{
        Body: CreateTechnologyRequestBody
        Reply: CreateTechnologyResponseBody
    }>,
    response: FastifyReply<{ Reply: CreateTechnologyResponseBody }>,
) {
    const { body } = request

    if (!body.name) throw new InvalidDataError('name: Required')

    const technologiesRepository = new PrismaTechnologiesRepository()

    const createTechnologyService = new CreateTechnologyService(
        technologiesRepository,
    )

    const technologyId = await createTechnologyService.execute(body)

    return await response.status(201).send({ technologyId })
}
