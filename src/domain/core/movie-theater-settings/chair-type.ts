import { randomUUID } from 'crypto'

export interface CreateChairTypeInput {
    name: string
}

export interface ChairTypeInput {
    id: string
    name: string
}

export class ChairType {
    private id: string
    private name: string

    static create({ name }: CreateChairTypeInput) {
        return new ChairType({
            id: randomUUID(),
            name,
        })
    }

    constructor({ id, name }: ChairTypeInput) {
        if (!id) {
            throw Error('The id attribute is required')
        }

        if (!name) {
            throw Error('The name attribute is required')
        }

        this.id = id
        this.name = name
    }

    getId() {
        return this.id
    }

    export() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
