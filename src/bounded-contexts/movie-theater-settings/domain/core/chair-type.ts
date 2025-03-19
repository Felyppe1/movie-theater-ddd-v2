import { randomUUID } from 'crypto'
import { InvalidDataError } from '../../../../shared/domain/errors/invalid-data-error'

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
            throw new InvalidDataError('The id attribute is required')
        }

        if (!name) {
            throw new InvalidDataError('The name attribute is required')
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
