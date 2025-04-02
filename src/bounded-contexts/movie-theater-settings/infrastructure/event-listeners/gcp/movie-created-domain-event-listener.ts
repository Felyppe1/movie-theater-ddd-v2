import { GCPPubSub } from '../../../../../shared/infrastructure/clouds/gcp/gcp-pubsub'
import { MovieCreatedDomainEventHandler } from '../../../application/event-handlers/movie-created-domain-event-handler'
import { MovieCreatedDomainEvent } from '../../../domain/events/movie-created-domain-event'

async function movieCreatedDomainEventListener() {
    // const emailService = new EmailService()

    const movieCreatedDomainEventHandler = new MovieCreatedDomainEventHandler()

    const pubSub = new GCPPubSub()

    await pubSub.subscribe('movie-created-domain-event-sub', async data => {
        try {
            console.log('Event received:', data)
            await movieCreatedDomainEventHandler.handle(
                data as MovieCreatedDomainEvent,
            )
        } catch (error) {
            console.error('Error processing event: ', error)
        }
    })
}

movieCreatedDomainEventListener()
