import { ConflictError } from '../../../../../shared/domain/errors/conflict-error'
import { Technology } from '../../../domain/core/technology'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'

interface CreateTechnologyServiceInput {
    name: string
}

export class CreateTechnologyService {
    constructor(
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async execute({ name }: CreateTechnologyServiceInput) {
        const technology = await this.technologiesRepository.getByName(name)

        if (technology) {
            throw new ConflictError(`Technology name ${name} already exists`)
        }

        const newTechnology = Technology.create({ name })

        await this.technologiesRepository.save(newTechnology)

        return newTechnology.getId()
    }
}
