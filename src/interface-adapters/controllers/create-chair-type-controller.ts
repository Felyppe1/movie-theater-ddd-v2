import { ChairTypesRepository } from '../../application/interfaces/repositories/chair-types-repository'
import { CreateChairTypeService } from '../../application/services/create-chair-type-service'
import { Controller, Request, Response } from './controller'

export interface CreateChairTypeControllerInput {
    name: string
}

export interface CreateChairTypeControllerOutput {
    chairTypeId: string
}

export class CreateChairTypeController
    implements
        Controller<
            CreateChairTypeControllerInput,
            CreateChairTypeControllerOutput
        >
{
    constructor(private readonly chairTypesRepository: ChairTypesRepository) {}

    async handle(
        request: Request<CreateChairTypeControllerInput>,
        response: Response<CreateChairTypeControllerOutput>,
    ): Promise<void> {
        const { body } = request

        const createChairTypeService = new CreateChairTypeService(
            this.chairTypesRepository,
        )

        const chairTypeId = await createChairTypeService.execute(body!)

        response.status(201).body({ chairTypeId }).send()
    }
}
