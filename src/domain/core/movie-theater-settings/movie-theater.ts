import { randomUUID } from 'crypto'

interface CreateMovieTheaterInput {
    chairs: {
        id: number
        value: number
    }[]
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export interface MovieTheaterInput {
    id: string
    chairs: Map<number, number>
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class MovieTheater {
    private id: string
    private chairs: Map<number, number>
    private address: Address

    static create({ chairs, ...data }: CreateMovieTheaterInput) {
        const chairsMap = new Map()
        
        chairs.forEach(chair => chairsMap.set(chair.id, chair.value))

        return new MovieTheater({
            id: randomUUID(),
            chairs: chairsMap,
            ...data
        })
    }

    constructor({
        id,
        chairs,
        ...address
    }: MovieTheaterInput) {
        if (!id) {
            throw Error('The id attribute is required')
        }

        if (!chairs) {
            throw Error('The chairs attribute is required')
        }

        this.id = id
        this.chairs = chairs
        this.address = new Address(address)
    }

    getId() {
        return this.id
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
}