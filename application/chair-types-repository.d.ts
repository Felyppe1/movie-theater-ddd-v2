import { ChairType } from "../domain/core/movie-theater-settings/chair-type"

export interface ChairTypesRepository {
    getAll(): Promise<ChairType[]>
}