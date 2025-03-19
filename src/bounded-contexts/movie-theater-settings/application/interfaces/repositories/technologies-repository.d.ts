import { Technology } from '../../../bounded-contexts/movie-theater-settings/domain/core/movie-theater-settings/technology'

export interface TechnologiesRepository {
    getAll(): Promise<Technology[]>
    save(technology: Technology): Promise<void>
    getByName(name: string): Promise<Technology | null>
}
