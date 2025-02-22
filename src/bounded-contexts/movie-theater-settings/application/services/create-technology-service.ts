import { Technology } from '../../domain/core/technology'
import { TechnologiesRepository } from '../interfaces/repositories/technologies-repository'

export class CreateTechnologyService {
    constructor(
        private readonly technologiesRepository: TechnologiesRepository,
    ) {}

    async execute(name: string) {
        const technology = await this.technologiesRepository.getByName(name)

        if (technology) {
            throw Error('Technology name already exists')
        }

        const newTechnology = Technology.create({ name })

        await this.technologiesRepository.save(newTechnology)

        return newTechnology.getId()
    }
}
