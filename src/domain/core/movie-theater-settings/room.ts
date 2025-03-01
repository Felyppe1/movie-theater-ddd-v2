import { randomUUID } from 'crypto'
import { InvalidDataError } from '../../errors/invalid-data-error'

interface RoomInput {
    id: string
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

interface CreateRoomInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export class Room {
    private id: string
    private movieTheaterId: string
    private number: number
    private layout: (string | null)[][]
    private technologyIds: string[]

    static create({
        movieTheaterId,
        number,
        layout,
        technologyIds,
    }: CreateRoomInput) {
        return new Room({
            id: randomUUID(),
            movieTheaterId,
            number,
            layout,
            technologyIds,
        })
    }

    constructor({
        id,
        movieTheaterId,
        number,
        layout,
        technologyIds,
    }: RoomInput) {
        if (!id) {
            throw new InvalidDataError('The room id field is required')
        }

        if (!movieTheaterId) {
            throw new InvalidDataError(
                'The room movieTheaterId field is required',
            )
        }

        if (number === undefined) {
            throw new InvalidDataError('The room number field is required')
        }

        if (!technologyIds || technologyIds.length === 0) {
            throw new InvalidDataError(
                'The room technologyIds field is required',
            )
        }

        const hasAtLeastOneChair = layout.some(row =>
            row.some(column => typeof column === 'string'),
        )
        if (!layout || layout.length === 0 || !hasAtLeastOneChair) {
            throw new InvalidDataError('The room layout field is required')
        }

        const firstLineLength = layout[0].length

        for (let nthLine = 1; nthLine < layout.length; nthLine++) {
            const nthLineLength = layout[nthLine].length

            if (nthLineLength !== firstLineLength) {
                throw new InvalidDataError(
                    `The length of line ${nthLine + 1} is not equal to the length of the first line`,
                )
            }
        }

        this.id = id
        this.movieTheaterId = movieTheaterId
        this.number = number
        this.layout = layout
        this.technologyIds = technologyIds
    }

    getId() {
        return this.id
    }

    getNumber() {
        return this.number
    }

    getMovieTheaterId() {
        return this.movieTheaterId
    }

    export() {
        return {
            id: this.id,
            movieTheaterId: this.movieTheaterId,
            number: this.number,
            layout: this.layout,
            technologyIds: this.technologyIds,
        }
    }
}
