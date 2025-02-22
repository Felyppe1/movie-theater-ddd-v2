import { ChairTypesRepository } from '../../../application/interfaces/repositories/chair-types-repository'
import { ChairType } from '../../../domain/core/movie-theater-settings/chair-type'
import { prisma } from './prisma-client'

export class PrismaChairTypesRepository implements ChairTypesRepository {
    async getAll(): Promise<ChairType[]> {
        const chairTypes = await prisma.chairType.findMany()

        return chairTypes.map(chairType => new ChairType(chairType))
    }
}
