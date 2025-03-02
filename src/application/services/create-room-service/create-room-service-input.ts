import { z } from 'zod'
import { ZodValidator } from '../../interfaces/validators/zod-validator'

interface CreateRoomInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]
}

// export class CreateRoomServiceInput extends ZodValidator<CreateRoomInput> {
//     movieTheaterId: string
//     number: number
//     layout: (string | null)[][]
//     technologyIds: string[]

//     constructor(data: CreateRoomInput) {
//         super()

//         const schema = z.object({
//             movieTheaterId: z.string().min(1),
//             number: z.number(),
//             layout: z.array(z.array(z.string().min(1).nullable())),
//             technologyIds: z.array(z.string().min(1)),
//         })

//         data = this.validate({ schema, data })

//         this.movieTheaterId = data.movieTheaterId
//         this.number = data.number
//         this.layout = data.layout
//         this.technologyIds = data.technologyIds
//     }
// }

export class CreateRoomServiceInput {
    movieTheaterId: string
    number: number
    layout: (string | null)[][]
    technologyIds: string[]

    constructor(data: CreateRoomInput) {
        const schema = z.object({
            movieTheaterId: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.string().min(1).nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        data = ZodValidator.validate({ schema, data })

        this.movieTheaterId = data.movieTheaterId
        this.number = data.number
        this.layout = data.layout
        this.technologyIds = data.technologyIds
    }
}
