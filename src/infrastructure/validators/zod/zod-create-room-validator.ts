import { z } from 'zod'
import { CreateRoomServiceInput } from '../../../application/services/create-room-service'
import { ZodValidator } from './zod-validator'

export class ZodCreateRoomValidator extends ZodValidator<CreateRoomServiceInput> {
    protected schema = z.object({
        movieTheaterId: z.string().min(1),
        number: z.number(),
        layout: z.array(z.array(z.string().min(1).nullable())),
        technologyIds: z.array(z.string().min(1)),
    })
}
