import { ZodError, ZodSchema } from 'zod'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'

interface ValidateInput {
    schema: ZodSchema
    data: any
}

export class ZodValidator {
    static validate<T>({ schema, data }: ValidateInput): T {
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
