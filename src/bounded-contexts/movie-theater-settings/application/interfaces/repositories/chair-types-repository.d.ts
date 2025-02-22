import { ChairType } from '../../../domain/core/chair-type'

export interface ChairTypesRepository {
    getAll(): Promise<ChairType[]>
}
