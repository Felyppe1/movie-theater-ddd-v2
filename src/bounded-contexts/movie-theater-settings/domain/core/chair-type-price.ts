import { InvalidDataError } from '../../../../shared/domain/errors/invalid-data-error'

export interface ChairTypePriceInput {
    movieTheaterId: string
    chairTypeId: string
    price: number
}

export class ChairTypePrice {
    private movieTheaterId: string
    private chairTypeId: string
    private price: number

    constructor({ movieTheaterId, chairTypeId, price }: ChairTypePriceInput) {
        if (!movieTheaterId) {
            throw new InvalidDataError(
                'The movieTheaterId attribute is required',
            )
        }

        if (!chairTypeId) {
            throw new InvalidDataError('The chairTypeId attribute is required')
        }

        if (!price) {
            throw new InvalidDataError('The price attribute is required')
        }

        this.movieTheaterId = movieTheaterId
        this.price = price
        this.chairTypeId = chairTypeId
    }

    export() {
        return {
            movieTheaterId: this.movieTheaterId,
            chairTypeId: this.chairTypeId,
            price: this.price,
        }
    }
}
