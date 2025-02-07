import { randomUUID } from 'crypto'
import { Room } from "./room";
import { SeatType } from "./seat-type";

export interface CreateMovieTheaterInput {
    rooms: Room[]
    seatTypes: SeatType[]
}

export interface MovieTheaterInput {
    id: string
    rooms: Room[]
    seatTypes: SeatType[]
}

export class MovieTheater {
    id: string
    rooms: Room[]
    seatTypes: SeatType[]

    static create({
        rooms,
        seatTypes
    }: CreateMovieTheaterInput) {
        return new MovieTheater({
            id: randomUUID(),
            rooms,
            seatTypes
        })
    }

    constructor({
        id,
        rooms,
        seatTypes
    }: MovieTheaterInput) {
        if (!id) {
            throw Error('Id is required')
        }

        if (!rooms) {
            throw Error('Rooms is required')
        }

        if (!seatTypes) {
            throw Error('SeatTypes is required')
        }

        this.rooms = rooms
        this.seatTypes = seatTypes
    }
}