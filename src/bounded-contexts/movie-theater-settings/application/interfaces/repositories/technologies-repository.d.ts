import { Technology } from '../../../domain/core/technology'

export interface TechnologiesRepository {
    getAll(): Promise<Technology[]>
    save(technology: Technology): Promise<void>
    getByName(name: string): Promise<Technology | null>
}
