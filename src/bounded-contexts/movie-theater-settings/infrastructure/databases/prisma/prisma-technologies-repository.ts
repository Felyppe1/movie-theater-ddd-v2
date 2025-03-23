import { TechnologiesRepository } from '../../../application/interfaces/repositories/technologies-repository'
import { Technology } from '../../../domain/core/technology'
import { prisma } from './prisma-client'

export class PrismaTechnologiesRepository implements TechnologiesRepository {
    async getAll(): Promise<Technology[]> {
        const technologies = await prisma.technology.findMany()

        return technologies.map(
            ({ percentageIncrease, ...data }) =>
                new Technology({
                    percentageIncrease: percentageIncrease ?? undefined,
                    ...data,
                }),
        )
    }

    async save(technology: Technology): Promise<void> {
        await prisma.technology.create({
            data: technology.export(),
        })
    }

    async getByName(name: string): Promise<Technology | null> {
        const technology = await prisma.technology.findFirst({
            where: { name },
        })

        if (!technology) return null

        return new Technology({
            ...technology,
            percentageIncrease: technology.percentageIncrease ?? undefined,
        })
    }

    async getById(id: string): Promise<Technology | null> {
        const technology = await prisma.technology.findUnique({
            where: { id },
        })

        if (!technology) return null

        return new Technology({
            ...technology,
            percentageIncrease: technology.percentageIncrease ?? undefined,
        })
    }
}
