import { RoomsValidator } from '../../../application/interfaces/validators/rooms-validator'
import { CreateRoomServiceInput } from '../../../application/services/create-room-service'
import { z } from 'zod'
import { UpdateRoomServiceInput } from '../../../application/services/update-room-service'

export class ZodRoomsValidator implements RoomsValidator {
    createData(data: CreateRoomServiceInput): CreateRoomServiceInput {
        const schema = z.object({
            movieTheaterId: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.number().nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        return schema.parse(data)
    }

    updateData(data: UpdateRoomServiceInput): UpdateRoomServiceInput {
        const schema = z.object({
            id: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.number().nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        return schema.parse(data)
    }
}
