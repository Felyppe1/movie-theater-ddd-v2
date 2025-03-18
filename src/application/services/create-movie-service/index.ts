import { Bucket } from '../../interfaces/clouds/bucket'
import { MoviesRepository } from '../../interfaces/repositories/movies-repository'
import {
    CLASSIFICATION,
    GENDER,
    Movie,
} from '../../../domain/core/movie-theater-settings/movie'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'
import { randomUUID } from 'crypto'

interface CreateMovieServiceInput {
    name: string
    synopsis: string
    duration: number
    subtitled: boolean
    genders: GENDER[]
    classification: CLASSIFICATION
    technologyIds: string[]
    initialDate: Date
    finalDate: Date
    base64Poster: string
}

export class CreateMovieService {
    constructor(
        private readonly moviesRepository: MoviesRepository,
        private readonly bucket: Bucket,
    ) {}

    async execute(data: CreateMovieServiceInput) {
        const match = data.base64Poster.match(/^data:(.+);base64,(.+)/)

        if (!match) {
            throw new InvalidDataError(
                'Could not extract mime type from poster base64 suffix',
            )
        }

        const posterMimeType = match[1]

        const posterExtension = posterMimeType.split('/')[1].toLowerCase()
        if (!['png', 'jpg', 'jpeg'].includes(posterExtension)) {
            throw new InvalidDataError(
                `Extension ${posterExtension} from poster is not accepted`,
            )
        }

        const posterBase64 = match[2]

        const posterBuffer = Buffer.from(posterBase64, 'base64')

        const posterSizeInMb = posterBuffer.length / 1000 / 1000

        if (posterSizeInMb > 5) {
            throw new InvalidDataError(
                "poster's size cannot be higher than 5MB",
            )
        }

        const bucketName = 'movie-theater-main'
        const destinationPath = `poster/${randomUUID()}.${posterExtension}`

        const poster = await this.bucket.uploadFromBuffer({
            bucketName,
            destinationPath,
            data: posterBuffer,
        })

        try {
            const newMovie = Movie.create({
                ...data,
                poster,
            })

            await this.moviesRepository.save(newMovie)

            // TODO: what if there was an error here?

            return newMovie.getId()
        } catch (e) {
            await this.bucket.deleteFile({ bucketName, destinationPath })

            throw e
        }
    }
}
