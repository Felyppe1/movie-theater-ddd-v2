import { z, ZodError } from 'zod'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'
import { ZodValidator } from '../../interfaces/validators/zod-validator'

interface CreateTechnologyInput {
    name: string
}

export class CreateTechnologyServiceInput {
    name: string

    constructor(data: CreateTechnologyInput) {
        // if (!data.name) {
        //     throw new InvalidDataError('Name is required')
        // }

        // if (data.name.length < 1) {
        //     throw new InvalidDataError('Name must have at least 1 character')
        // }

        const schema = z.object({
            name: z.string().min(1),
        })

        data = ZodValidator.validate({ schema, data })

        this.name = data.name
    }
}
