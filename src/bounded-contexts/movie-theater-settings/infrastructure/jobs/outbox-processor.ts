import { prisma } from '../databases/prisma/prisma-client'
import { PubSub } from '../../../../shared/application/interfaces/pub-sub'
import { OutboxRepository } from './outbox-repository'
import { GCPPubSub } from '../../../../shared/infrastructure/clouds/gcp/gcp-pubsub'
import { PrismaOutboxRepository } from '../databases/prisma/prisma-outbox-repository'

const BATCH_SIZE = 10

export class OutboxWorker {
    constructor(
        private readonly outboxRepository: OutboxRepository,
        private readonly pubsub: PubSub,
    ) {}

    async processPendingEvents() {
        const pendingEvents =
            await this.outboxRepository.getManyPendingEvents(BATCH_SIZE)

        for (const event of pendingEvents) {
            try {
                // Reconstruct the original event if needed, or use payload directly
                const eventPayload = event.payload as any

                await this.pubsub.publish(event.event_name, eventPayload)

                await this.outboxRepository.update(event.id, 'published')

                console.log(
                    `Event ${event.id} (${event.event_name}) published successfully.`,
                )
            } catch (error) {
                console.error(`Failed to publish event ${event.id}:`, error)
                // Optionally, implement a retry mechanism or mark as 'failed'
                await this.outboxRepository.update(event.id, 'failed')
            }
        }
    }
}

// This would typically be in a separate script or managed process
export async function runWorker() {
    const outboxRepository = new PrismaOutboxRepository(prisma)
    const pubsub = new GCPPubSub()

    const outboxWorker = new OutboxWorker(outboxRepository, pubsub)

    const time = 1000 * 10

    // Run periodically (e.g., using setInterval, a cron job, or a queue worker)
    setInterval(async () => {
        console.log('Checking for pending outbox events...')
        await outboxWorker.processPendingEvents()
    }, time) // e.g., every 10 seconds
}
