import { z, ZodError, ZodSchema } from 'zod'
import { InvalidDataError } from '../domain/errors/invalid-data-error'

interface ValidateInput<T extends ZodSchema> {
    schema: T
    data: z.infer<T>
}

export class Zod {
    static validate<T extends ZodSchema>({
        schema,
        data,
    }: ValidateInput<T>): z.infer<T> {
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
