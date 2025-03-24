import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Zod } from '../../../shared/libs/zod'
import { PrismaMovieTheatersRepository } from '../infrastructure/databases/prisma/prisma-movie-theaters-repository'
import { PrismaChairTypesRepository } from '../infrastructure/databases/prisma/prisma-chair-types-repository'
import { PrismaChairTypePricesRepository } from '../infrastructure/databases/prisma/prisma-chair-type-prices-repository'
import { CreateChairTypePriceService } from '../application/services/create-chair-type-price-service'

interface CreateChairTypePriceRequestBody {
    movieTheaterId: string
    chairTypeId: string
    price: number
}

export async function createChairTypePriceController(
    request: FastifyRequest<{ Body: CreateChairTypePriceRequestBody }>,
    response: FastifyReply,
) {
    const { body } = request

    const schema = z.object({
        movieTheaterId: z.string().min(1),
        chairTypeId: z.string().min(1),
        price: z.coerce.number(),
    })

    const bodyValidated = Zod.validate({ schema, data: body })

    const chairTypePricesRepository = new PrismaChairTypePricesRepository()
    const movieTheatersRepository = new PrismaMovieTheatersRepository()
    const chairTypesRepository = new PrismaChairTypesRepository()

    const createChairTypePriceService = new CreateChairTypePriceService(
        chairTypePricesRepository,
        movieTheatersRepository,
        chairTypesRepository,
    )

    await createChairTypePriceService.execute(bodyValidated)

    return response.status(201).send()
}
