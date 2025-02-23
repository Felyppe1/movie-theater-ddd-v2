import { randomUUID } from 'crypto'

interface RoomInput {
    id: string
    movieTheaterId: string
    number: number
    layout: (number | null)[][]
    technologyIds: string[]
}

interface CreateRoomInput {
    movieTheaterId: string
    number: number
    layout: (number | null)[][]
    technologyIds: string[]
}

export class Room {
    private id: string
    private movieTheaterId: string
    private number: number
    private layout: (number | null)[][]
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
            throw Error('The room id field is required')
        }

        if (!movieTheaterId) {
            throw Error('The room movieTheaterId field is required')
        }

        if (number === undefined || number === null) {
            throw Error('The room number field is required')
        }

        if (!technologyIds || technologyIds.length === 0) {
            throw Error('The room technologyIds field is required')
        }

        const hasAtLeastOneChair = layout.some(row =>
            row.some(column => typeof column === 'number'),
        )
        if (!layout || layout.length === 0 || !hasAtLeastOneChair) {
            throw Error('The room layout field is required')
        }

        const firstLineLength = layout[0].length

        for (let nthLine = 1; nthLine < layout.length; nthLine++) {
            const nthLineLength = layout[nthLine].length

            if (nthLineLength !== firstLineLength) {
                throw Error(
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
