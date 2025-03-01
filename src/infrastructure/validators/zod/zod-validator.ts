import { ZodError, ZodSchema } from 'zod'
import { Validator } from '../../../application/interfaces/validators/validator'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'

export abstract class ZodValidator<T> implements Validator<T> {
    protected abstract schema: ZodSchema<T>

    validate(data: T): T {
        try {
            return this.schema.parse(data)
        } catch (error) {
            this.handleError(error)
        }
    }

    protected handleError(error: unknown): never {
        if (error instanceof ZodError) {
            const errorMessage = error.errors
                .map(err => `${err.path.join('.')}: ${err.message}`)
                .join('; ')

            throw new InvalidDataError(errorMessage)
        }

        throw error
    }
}
