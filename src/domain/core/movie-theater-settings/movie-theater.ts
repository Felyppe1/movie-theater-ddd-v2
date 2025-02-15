import { randomUUID } from 'crypto'

interface CreateMovieTheaterInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export interface MovieTheaterInput {
    id: string
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class MovieTheater {
    private id: string
    private address: Address

    static create(data: CreateMovieTheaterInput) {
        return new MovieTheater({
            id: randomUUID(),
            ...data,
        })
    }

    constructor({ id, ...address }: MovieTheaterInput) {
        if (!id) {
            throw Error('The id attribute is required')
        }

        this.id = id
        this.address = new Address(address)
    }

    getId() {
        return this.id
    }

    export() {
        return {
            id: this.id,
            ...this.address.export(),
        }
    }
}

interface AddressInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class Address {
    private number: string
    private complement?: string
    private zipCode: string
    private street: string
    private city: string
    private state: string

    constructor({
        number,
        complement,
        zipCode,
        street,
        city,
        state,
    }: AddressInput) {
        if (!number) {
            throw Error('The number attribute is required')
        }

        if (!street) {
            throw Error('The street attribute is required')
        }

        if (!city) {
            throw Error('The city attribute is required')
        }

        if (!state) {
            throw Error('The state attribute is required')
        }

        this.number = number
        this.complement = complement
        this.zipCode = zipCode
        this.street = street
        this.city = city
        this.state = state
    }

    export() {
        return {
            number: this.number,
            complement: this.complement,
            zipCode: this.zipCode,
            street: this.street,
            city: this.city,
            state: this.state,
        }
    }
}
