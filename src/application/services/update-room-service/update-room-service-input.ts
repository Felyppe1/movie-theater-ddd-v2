import { z } from 'zod'
import { ZodValidator } from '../../interfaces/validators/zod-validator'

interface UpdateRoomInput {
    id: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

export class UpdateRoomServiceInput {
    id: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]

    constructor(data: UpdateRoomInput) {
        const schema = z.object({
            id: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.string().min(1).nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        data = ZodValidator.validate({ schema, data })

        this.id = data.id
        this.number = data.number
        this.layout = data.layout
        this.technologyIds = data.technologyIds
    }
}
