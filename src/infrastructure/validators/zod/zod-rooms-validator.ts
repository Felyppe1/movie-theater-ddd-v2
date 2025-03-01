import { RoomsValidator } from '../../../application/interfaces/validators/rooms-validator'
import { CreateRoomServiceInput } from '../../../application/services/create-room-service'
import { z, ZodError } from 'zod'
import { UpdateRoomServiceInput } from '../../../application/services/update-room-service'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'

export class ZodRoomsValidator implements RoomsValidator {
    createData(data: CreateRoomServiceInput): CreateRoomServiceInput {
        const schema = z.object({
            movieTheaterId: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.string().min(1).nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        try {
            return schema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors
                    .map(err => `${err.path.join('.')}: ${err.message}`)
                    .join('; ')

                throw new InvalidDataError(errorMessage)
            }

            throw error
        }
    }

    updateData(data: UpdateRoomServiceInput): UpdateRoomServiceInput {
        const schema = z.object({
            id: z.string().min(1),
            number: z.number(),
            layout: z.array(z.array(z.string().min(1).nullable())),
            technologyIds: z.array(z.string().min(1)),
        })

        try {
            return schema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors
                    .map(err => `${err.path.join('.')}: ${err.message}`)
                    .join('; ')

                throw new InvalidDataError(errorMessage)
            }

            throw error
        }
    }
}
