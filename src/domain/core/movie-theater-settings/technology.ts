import { randomUUID } from 'crypto'

export interface TechnologyInput {
    id: string
    name: string
    percentageIncrease?: number
}

export interface CreateTechnologyInput {
    name: string
    percentageIncrease?: number
}

export class Technology {
    private id: string
    private name: string
    private percentageIncrease?: number

    static create(data: CreateTechnologyInput) {
        return new Technology({
            id: randomUUID(),
            ...data,
        })
    }

    constructor({ id, name, percentageIncrease }: TechnologyInput) {
        if (!id) {
            throw Error('The id attribute is required')
        }

        if (!name) {
            throw Error('The name attribute is required')
        }

        this.id = id
        this.name = name
        this.percentageIncrease = percentageIncrease
    }

    getId() {
        return this.id
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            percentageIncrease: this.percentageIncrease,
        }
    }
}
