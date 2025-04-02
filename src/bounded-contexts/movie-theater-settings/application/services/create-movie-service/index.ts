import { Bucket } from '../../../../../shared/application/interfaces/clouds/bucket'
import { PubSub } from '../../../../../shared/application/interfaces/pub-sub'
import { InvalidDataError } from '../../../../../shared/domain/errors/invalid-data-error'
import { CLASSIFICATION, GENDER, Movie } from '../../../domain/core/movie'
import { MovieCreatedDomainEvent } from '../../../domain/events/movie-created-domain-event'
import { MoviesRepository } from '../../interfaces/repositories/movies-repository'
import { randomUUID } from 'crypto'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'

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
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly bucket: Bucket,
        private readonly pubsub: PubSub,
    ) {}

    async execute(data: CreateMovieServiceInput) {
        const technologies = await this.technologiesRepository.getAll()

        const technologyIds = technologies.map(technology => technology.getId())

        const technologyIdNotFound = data.technologyIds.find(
            technologyId => !technologyIds.includes(technologyId),
        )

        if (technologyIdNotFound) {
            throw new NotFoundError(
                `Technology id ${technologyIdNotFound} not found`,
            )
        }

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

        const bucketName = 'movie-theater'
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

            const movieDomainEvents = newMovie.getDomainEvents()

            movieDomainEvents.forEach(async event => {
                await this.pubsub.publish(event.name, event)
            })

            return newMovie.getId()
        } catch (e) {
            await this.bucket.deleteFile({ bucketName, destinationPath })

            throw e
        }
    }
}
