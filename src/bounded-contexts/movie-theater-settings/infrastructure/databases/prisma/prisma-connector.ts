import { DatabaseConnector } from '../../../application/interfaces/database/database-connector'
import { prisma } from './prisma-client'

export class PrismaDatabaseConnector implements DatabaseConnector {
    async query<T = any>(rawQuery: string, params: any[] = []): Promise<T> {
        return prisma.$queryRawUnsafe<T>(rawQuery, ...params)
    }
}
