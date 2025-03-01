import { z } from 'zod'
import { UpdateRoomServiceInput } from '../../../application/services/update-room-service'
import { ZodValidator } from './zod-validator'

export class ZodUpdateRoomValidator extends ZodValidator<UpdateRoomServiceInput> {
    protected schema = z.object({
        id: z.string().min(1),
        number: z.number(),
        layout: z.array(z.array(z.string().min(1).nullable())),
        technologyIds: z.array(z.string().min(1)),
    })
}
