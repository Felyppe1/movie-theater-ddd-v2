import { randomUUID } from 'crypto'
import { EmailService } from '../../../../shared/application/interfaces/email-service'
import { EventBus } from '../../../../shared/application/interfaces/event-bus'
import { MovieCreatedDomainEvent } from '../../domain/events/movie-created-domain-event'
import {
    Outbox,
    OutboxRepository,
} from '../../infrastructure/jobs/outbox-repository'

export class MovieCreatedDomainEventHandler {
    constructor(private readonly outboxRepository: OutboxRepository) {}

    async handle(data: MovieCreatedDomainEvent) {
        console.log('Processando movie-created-domain-event')
        const users = ['felyppe.nunes1@gmail.com']

        const event: Outbox = {
            id: randomUUID(),
            event_name: 'send-email',
            payload: {
                to: users,
                subject: 'Teste de envio de email',
                body: `Um novo filme foi cadastrado com o nome ${data.name}`,
            },
            status: 'pending',
            updated_at: null,
            created_at: new Date(),
        }

        await this.outboxRepository.save(event)
    }
}
