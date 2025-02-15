import {
    GetAllOutput,
    TechnologiesRepository,
} from '../../../application/interfaces/repositories/technologies-repository'
import { prisma } from './prisma-client'

export class PrismaTechnologiesRepository implements TechnologiesRepository {
    async getAll(): Promise<GetAllOutput[]> {
        const technologies = await prisma.technology.findMany()

        return technologies
    }
}
