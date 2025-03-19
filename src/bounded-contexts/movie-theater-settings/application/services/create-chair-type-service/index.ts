import { ConflictError } from '../../../../../shared/domain/errors/conflict-error'
import { ChairType } from '../../../domain/core/chair-type'
import { ChairTypesRepository } from '../../interfaces/repositories/chair-types-repository'

interface CreateChairTypeServiceInput {
    name: string
}

export class CreateChairTypeService {
    constructor(private readonly chairTypesRepository: ChairTypesRepository) {}

    async execute({ name }: CreateChairTypeServiceInput) {
        const chairTypeNameExists =
            await this.chairTypesRepository.getByName(name)

        if (chairTypeNameExists) {
            throw new ConflictError(`Chair type id ${name} already exists`)
        }

        const chairType = ChairType.create({ name })

        await this.chairTypesRepository.save(chairType)

        return chairType.getId()
    }
}
