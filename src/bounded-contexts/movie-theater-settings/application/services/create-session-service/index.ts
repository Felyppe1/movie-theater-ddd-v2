import { ConflictError } from '../../../../../shared/domain/errors/conflict-error'
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'
import { SessionsRepository } from '../../interfaces/repositories/sessions-repository'
import { MoviesRepository } from '../../interfaces/repositories/movies-repository'
import { RoomsRepository } from '../../interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'
import { Session } from '../../../domain/core/session'
import { ChairTypePricesRepository } from '../../interfaces/repositories/chair-type-prices-repository'
import { ChairTypesRepository } from '../../interfaces/repositories/chair-types-repository'

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
        private readonly chairTypePricesRepository: ChairTypePricesRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
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

        const chairTypesUsedInTheRoom =
            await this.chairTypesRepository.getManyByRoomId(data.roomId)

        const chairTypePrices = await this.chairTypePricesRepository.getMany({
            chairTypeIds: chairTypesUsedInTheRoom.map(chairType =>
                chairType.getId(),
            ),
            movieTheaterId: room.getMovieTheaterId(),
        })

        if (chairTypesUsedInTheRoom.length != chairTypePrices.length) {
            throw new ConflictError(
                'A chair type used in the room has no price set to the movie theater',
            )
        }

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

        const movieHasTheTechnology = movie.hasTechnology(data.technologyId)
        const roomHasTheTechnology = room.hasTechnology(data.technologyId)

        if (!movieHasTheTechnology || !roomHasTheTechnology) {
            throw new ConflictError(
                `Movie and room must support the technology id ${data.technologyId}`,
            )
        }

        const isThereOverlappedSchedule =
            await this.sessionsRepository.hasOverlappedSchedule({
                durationInMinutes: movie.getDuration(),
                roomId: room.getId(),
                sessionDateTime: data.schedule,
            })

        if (isThereOverlappedSchedule) {
            throw new ConflictError(
                'The time of this session conflicts with another one',
            )
        }

        const newSession = Session.create(data)

        this.sessionsRepository.save(newSession)

        return newSession.getId()
    }
}
