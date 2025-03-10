import { Technology } from '../../../domain/core/movie-theater-settings/technology'
import { ConflictError } from '../../../domain/errors/conflict-error'
import { TechnologiesRepository } from '../../interfaces/repositories/technologies-repository'
import { CreateTechnologyServiceInput } from './create-technology-service-input'

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
