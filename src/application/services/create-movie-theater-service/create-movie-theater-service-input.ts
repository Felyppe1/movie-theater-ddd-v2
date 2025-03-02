import { z } from 'zod'
import { ZodValidator } from '../../interfaces/validators/zod-validator'

interface CreateMovieTheaterInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string
}

export class CreateMovieTheaterServiceInput {
    number: string
    complement?: string
    zipCode: string
    street: string
    city: string
    state: string

    constructor(data: CreateMovieTheaterInput) {
        const schema = z.object({
            number: z.string().min(1),
            complement: z.string().min(1).nullable(),
            zipCode: z.string().min(8),
            street: z.string().min(1),
            city: z.string().min(1),
            state: z.string().min(1),
        })

        data = ZodValidator.validate({ schema, data })

        this.number = data.number
        this.complement = data.complement
        this.zipCode = data.zipCode
        this.street = data.street
        this.city = data.city
        this.state = data.state
    }
}
