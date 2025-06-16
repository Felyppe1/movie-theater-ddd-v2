import { Bucket } from '../../../../../shared/application/interfaces/clouds/bucket'
import { InvalidDataError } from '../../../../../shared/domain/errors/invalid-data-error'
import { CLASSIFICATION, GENDER, Movie } from '../../../domain/core/movie'
import { MoviesRepository } from '../../interfaces/repositories/movies-repository'
import { randomUUID } from 'crypto'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'

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

const BUCKET_NAME = 'movie-images-movie-theater-ddd'

export class CreateMovieService {
    constructor(
        private readonly moviesRepository: MoviesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly bucket: Bucket,
    ) {}

    async execute(data: CreateMovieServiceInput) {
        const technologies = await this.technologiesRepository.getAll()
        const technologyIds = technologies.map(technology => technology.getId())

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

        const destinationPath = `poster/${randomUUID()}.${posterExtension}`

        const poster = await this.bucket.uploadFromBuffer({
            bucketName: BUCKET_NAME,
            destinationPath,
            data: posterBuffer,
        })

        try {
            const newMovie = Movie.create(
                {
                    ...data,
                    poster,
                },
                technologyIds,
            )

            await this.moviesRepository.save(newMovie)

            return newMovie.getId()
        } catch (e) {
            await this.bucket.deleteFile({
                bucketName: BUCKET_NAME,
                destinationPath,
            })

            throw e
        }
    }
}
