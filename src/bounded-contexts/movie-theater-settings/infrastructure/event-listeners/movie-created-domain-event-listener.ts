import { GCPPubSub } from '../../../../shared/infrastructure/clouds/gcp/gcp-pubsub'
import { MovieCreatedDomainEventHandler } from '../../application/event-handlers/movie-created-domain-event-handler'
import { MovieCreatedDomainEvent } from '../../domain/events/movie-created-domain-event'
import { prisma } from '../databases/prisma/prisma-client'
import { PrismaOutboxRepository } from '../databases/prisma/prisma-outbox-repository'

export async function movieCreatedDomainEventListener() {
    const TOPIC_NAME = 'movie-created-domain-event-sub'

    const outboxRepository = new PrismaOutboxRepository(prisma)

    const movieCreatedDomainEventHandler = new MovieCreatedDomainEventHandler(
        outboxRepository,
    )

    const pubSub = new GCPPubSub()

    await pubSub.subscribe(TOPIC_NAME, async data => {
        await movieCreatedDomainEventHandler.handle(
            data as MovieCreatedDomainEvent,
        )
    })
}
