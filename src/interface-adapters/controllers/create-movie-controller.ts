import { z } from 'zod'
import { Bucket } from '../../application/interfaces/clouds/bucket'
import { MoviesRepository } from '../../application/interfaces/repositories/movies-repository'
import { CreateMovieService } from '../../application/services/create-movie-service'
import {
    CLASSIFICATION,
    GENDER,
} from '../../domain/core/movie-theater-settings/movie'
import { Controller, Request, Response } from './controller'
import { ZodValidator } from '../../application/interfaces/validators/zod-validator'

const bodyValidation = z.object({
    name: z.string(),
    synopsis: z.string(),
    duration: z.coerce.number(),
    subtitled: z.coerce.boolean(),
    genders: z.array(z.enum([GENDER.ACTION, GENDER.COMEDY, GENDER.HORROR])),
    classification: z.enum([CLASSIFICATION.L, CLASSIFICATION.TWELVE]),
    technologyIds: z.array(z.string()),
    initialDate: z.coerce.date(),
    finalDate: z.coerce.date(),
    poster: z.string(),
})

export interface CreateMovieControllerInput {
    name: string
    synopsis: string
    duration: number
    subtitled: boolean
    genders: GENDER[]
    classification: CLASSIFICATION
    technologyIds: string[]
    initialDate: Date
    finalDate: Date
    poster: string
}

export interface CreateMovieControllerOutput {
    movieId: string
}

export class CreateMovieController
    implements
        Controller<CreateMovieControllerInput, CreateMovieControllerOutput>
{
    constructor(
        private readonly moviesRepository: MoviesRepository,
        private readonly bucket: Bucket,
    ) {}

    async handle(
        request: Request<CreateMovieControllerInput>,
        response: Response<CreateMovieControllerOutput>,
    ): Promise<void> {
        const { poster: base64Poster, ...body } =
            ZodValidator.validate<CreateMovieControllerInput>({
                schema: bodyValidation,
                data: request.body,
            })

        const createMovieService = new CreateMovieService(
            this.moviesRepository,
            this.bucket,
        )

        const movieId = await createMovieService.execute({
            ...body,
            base64Poster,
        })

        response.status(201).body({ movieId }).send()
    }
}
