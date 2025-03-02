import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { CreateTechnologyService } from '../../application/services/create-technology-service'
import { Controller, Request, Response } from './controller'

export interface CreateTechnologyControllerInput {
    name: string
}

export interface CreateTechnologyControllerOutput {
    technologyId: string
}

export class CreateTechnologyController
    implements
        Controller<
            CreateTechnologyControllerInput,
            CreateTechnologyControllerOutput
        >
{
    constructor(
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async handle(
        request: Request<CreateTechnologyControllerInput>,
        response: Response<CreateTechnologyControllerOutput>,
    ) {
        const createTechnologyService = new CreateTechnologyService(
            this.technologiesRepository,
        )

        const { body } = request

        const technologyId = await createTechnologyService.execute(body!)

        response.status(201).body({ technologyId }).send()
    }
}
