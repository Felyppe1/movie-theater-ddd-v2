export interface ChairTypeInput {
    id: number,
    name: string
}

export class ChairType {
    private id: number
    private name: string

    constructor({
        id,
        name
    }: ChairTypeInput) {
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
}