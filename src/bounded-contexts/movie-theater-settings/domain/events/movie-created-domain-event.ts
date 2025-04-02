import { DomainEvent } from '../primitives/domain-event'

export class MovieCreatedDomainEvent extends DomainEvent {
    readonly movieId: string

    constructor(movieId: string) {
        super('movie-created-domain-event')

        this.movieId = movieId
    }
}
