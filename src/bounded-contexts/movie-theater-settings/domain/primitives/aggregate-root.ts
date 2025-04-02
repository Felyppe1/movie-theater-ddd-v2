import { DomainEvent } from './domain-event'

export abstract class AggregateRoot {
    private readonly domainEvents: DomainEvent[] = []

    getDomainEvents() {
        return [...this.domainEvents]
    }

    protected raiseDomainEvent(domainEvent: DomainEvent) {
        this.domainEvents.push(domainEvent)
    }
}
