import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { CreateTechnologyService } from '../../application/services/create-technology-service'
import { Request, Response } from './controller'

export class CreateTechnologyController {
    constructor(
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async handle(
        request: Request<{ name: string }>,
    ): Promise<Response<string>> {
        const createTechnologyService = new CreateTechnologyService(
            this.technologiesRepository,
        )

        const { body } = request

        const technologyId = await createTechnologyService.execute(body.name)

        return { status: 201, body: technologyId }
    }
}
