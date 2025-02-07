enum SEAT_TYPE {
    STANDARD,
    D_BOX,
    LOVE
}

export interface SeatTypeProps {
    type: SEAT_TYPE,
    price: number
}

export class SeatType {
    type: SEAT_TYPE
    price: number

    constructor({
        type, price
    }: SeatTypeProps) {
        if (type === undefined || type === null) {
            throw Error('Type is required')
        }

        if (!price) {
            throw Error('Price is required')
        }

        this.type = type
        this.price = price
    }
}