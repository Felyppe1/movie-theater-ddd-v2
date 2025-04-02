import { EmailService } from '../../../../shared/application/interfaces/email-service'
import { MovieCreatedDomainEvent } from '../../domain/events/movie-created-domain-event'

export class MovieCreatedDomainEventHandler {
    constructor(/* private readonly emailService: EmailService */) {}

    async handle(data: MovieCreatedDomainEvent) {
        console.log('Evento chegou no handler: ', data)
    }
}
