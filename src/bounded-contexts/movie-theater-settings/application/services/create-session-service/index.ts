import { ConflictError } from '../../../../../shared/domain/errors/conflict-error'
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'
import { SessionsRepository } from '../../interfaces/repositories/sessions-repository'
import { MoviesRepository } from '../../interfaces/repositories/movies-repository'
import { RoomsRepository } from '../../interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'
import { Session } from '../../../domain/core/session'

interface CreateSessionServiceInput {
    movieId: string
    roomId: string
    schedule: Date
    isSubtitled: boolean
    technologyId: string
}

export class CreateSessionService {
    constructor(
        private readonly sessionsRepository: SessionsRepository,
        private readonly moviesRepository: MoviesRepository,
        private readonly roomsRepository: RoomsRepository,
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async execute(data: CreateSessionServiceInput) {
        const movie = await this.moviesRepository.getById(data.movieId)

        if (!movie) {
            throw new NotFoundError(`Movie id ${data.movieId} not found`)
        }

        const room = await this.roomsRepository.getById(data.roomId)

        if (!room) {
            throw new NotFoundError(`Room id ${data.roomId} not found`)
        }

        const technology = await this.technologiesRepository.getById(
            data.technologyId,
        )

        if (!technology) {
            throw new NotFoundError(
                `Technology id ${data.technologyId} not found`,
            )
        }

        // TODO: check if room's chairs have a price set

        if (data.schedule < movie.getInitialDate()) {
            throw new ConflictError(
                'Movie cannot be screened before the release data',
            )
        }

        if (data.isSubtitled && !movie.getSubtitled()) {
            throw new ConflictError(
                'Movie has no subtitled version to be screened',
            )
        }

        const movieHasTechnology = movie
            .getTechnologyIds()
            .some(technologyId => technologyId === data.technologyId)
        const roomHasTechnology = room
            .getTechnologyIds()
            .some(technologyId => technologyId === data.technologyId)

        if (!movieHasTechnology || !roomHasTechnology) {
            throw new ConflictError(
                `Movie and room must support the technology id ${data.technologyId}`,
            )
        }

        const hasOverlappedSchedule =
            await this.sessionsRepository.hasOverlappedSchedule({
                durationInMinutes: movie.getDuration(),
                roomId: room.getId(),
                sessionDateTime: data.schedule,
            })

        if (hasOverlappedSchedule) {
            throw new ConflictError(
                'The time of this session conflicts with another one',
            )
        }

        const newSession = Session.create(data)

        this.sessionsRepository.save(newSession)

        return newSession.getId()
    }
}
