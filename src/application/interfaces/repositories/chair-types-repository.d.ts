import { ChairType } from '../../../domain/core/movie-theater-settings/chair-type'

export interface ChairTypesRepository {
    getAll(): Promise<ChairType[]>
    getByName(name: string): Promise<ChairType | null>
    save(chairType: ChairType): Promise<void>
}
