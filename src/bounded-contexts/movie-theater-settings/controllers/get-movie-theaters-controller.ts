import { FastifyReply, FastifyRequest } from 'fastify'
import { GetMovieTheatersService } from '../application/services/get-movie-theaters-service'
import { PrismaDatabaseConnector } from '../infrastructure/databases/prisma/prisma-connector'
import { Zod } from '../../../shared/libs/zod'
import { z } from 'zod'

export interface GetMovieTheatersRequestQuery {
    offset?: number
    limit?: number
}

export async function getMovieTheatersController(
    request: FastifyRequest<{
        Querystring: GetMovieTheatersRequestQuery
    }>,
    response: FastifyReply,
) {
    const schema = z.object({
        offset: z.coerce.number().optional(),
        limit: z.coerce.number().min(1).max(50).optional(),
    })

    const validatedData = Zod.validate({
        schema,
        data: { offset: request.query.offset, limit: request.query.limit },
    })

    const databaseConnector = new PrismaDatabaseConnector()

    const getMovieTheatersService = new GetMovieTheatersService(
        databaseConnector,
    )

    const data = await getMovieTheatersService.execute(validatedData)

    return await response.status(200).send(data)
}
