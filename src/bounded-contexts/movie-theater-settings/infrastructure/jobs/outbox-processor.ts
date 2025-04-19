import { prisma } from '../databases/prisma/prisma-client'
import { PubSub } from '../../../../shared/application/interfaces/pub-sub'

const BATCH_SIZE = 10

export class OutboxProcessor {
    constructor(private readonly pubsub: PubSub) {}

    async execute(): Promise<number> {
        const outboxEvents = await prisma.outbox.findMany({
            where: { processed_on: null },
            orderBy: { occurred_on: 'asc' },
            take: BATCH_SIZE,
        })

        for (const event of outboxEvents) {
            try {
                const eventName = event.event_name
                const payload = event.payload

                if (payload === null) {
                    throw new Error(`${eventName} event payload is null`)
                }
                // const domainEvent: DomainEvent = this.deserializeEvent(eventName, payload)

                await this.pubsub.publish(eventName, JSON.parse(payload))

                await prisma.outbox.update({
                    where: { id: event.id },
                    data: {
                        processed_on: new Date(),
                    },
                })
            } catch (error: any) {
                console.error(`[OutboxProcessor]: ${error.message}`)
                // await prisma.outbox.update({
                //     where: { id: event.id },
                //     data: {
                //         processed_on: new Date(),
                //     },
                // })
            }
        }

        return outboxEvents.length
    }

    // private deserializeEvent(type: string, payload: any): DomainEvent {
    //     // Exemplo simples, você pode ter um EventMapper centralizado aqui:
    //     switch (type) {
    //         case 'movie-created-domain-event':
    //             const { movieId } = payload
    //             return new MovieCreatedDomainEvent(movieId)
    //         default:
    //             throw new Error(`Unsupported event type: ${type}`)
    //     }
    // }
}
