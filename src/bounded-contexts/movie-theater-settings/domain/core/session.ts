import { randomUUID } from 'crypto'
import { InvalidDataError } from '../../../../shared/domain/errors/invalid-data-error'

interface CreateSessionInput {
    movieId: string
    roomId: string
    schedule: Date
    isSubtitled: boolean
    technologyId: string
}

interface SessionInput {
    id: string
    movieId: string
    roomId: string
    schedule: Date
    isSubtitled: boolean
    technologyId: string // should it be the technologyName? a copy instead of a reference...
}

export class Session {
    private id: string
    private movieId: string
    private roomId: string
    private schedule: Date
    private isSubtitled: boolean
    private technologyId: string

    static create(data: CreateSessionInput) {
        return new Session({
            id: randomUUID(),
            ...data,
        })
    }

    constructor({
        id,
        movieId,
        roomId,
        schedule,
        isSubtitled,
        technologyId,
    }: SessionInput) {
        if (!id) {
            throw new InvalidDataError('Id is required')
        }

        if (!movieId) {
            throw new InvalidDataError('MovieId is required')
        }

        if (!roomId) {
            throw new InvalidDataError('RoomId is required')
        }

        if (!schedule) {
            throw new InvalidDataError('Schedule is required')
        }

        if (isSubtitled === undefined) {
            throw new InvalidDataError('IsSubtitled is required')
        }

        if (!technologyId) {
            throw new InvalidDataError('TechnologyId is required')
        }

        this.id = id
        this.movieId = movieId
        this.roomId = roomId
        this.schedule = schedule
        this.isSubtitled = isSubtitled
        this.technologyId = technologyId
    }

    getId() {
        return this.id
    }

    export() {
        return {
            id: this.id,
            movieId: this.movieId,
            roomId: this.roomId,
            schedule: this.schedule,
            isSubtitled: this.isSubtitled,
            technologyId: this.technologyId,
        }
    }
}
