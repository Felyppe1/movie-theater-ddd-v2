import { PrismaClient } from '@prisma/client'
import { Outbox, OutboxRepository } from '../../jobs/outbox-repository'

export class PrismaOutboxRepository implements OutboxRepository {
    constructor(private readonly prisma: PrismaClient) {}

    // private mapToDomain(prismaOutbox: PrismaOutbox): Outbox {
    //     if (!prismaOutbox) {
    //         return null
    //     }
    //     return {
    //         id: prismaOutbox.id,
    //         event_name: prismaOutbox.event_name,
    //         payload: prismaOutbox.payload, // Prisma handles Json type automatically
    //         ocurred_on: prismaOutbox.occurred_on, // Mapping Prisma's occurred_on
    //         processed_on: prismaOutbox.processed_on,
    //     }
    // }

    async getManyPendingEvents(limit?: number): Promise<Outbox[]> {
        const take = limit ?? 10

        const pendingPrismaEvents = await this.prisma.outbox.findMany({
            where: {
                status: 'pending',
            },
            orderBy: {
                created_at: 'asc',
            },
            take,
        })

        return pendingPrismaEvents
    }

    async deleteById(id: string): Promise<void> {
        await this.prisma.outbox.delete({
            where: {
                id: id,
            },
        })
    }

    async update(id: string, newStatus: string): Promise<Outbox> {
        const updatedPrismaEvent = await this.prisma.outbox.update({
            where: {
                id: id,
            },
            data: {
                status: newStatus,
            },
        })

        return updatedPrismaEvent
    }
}
