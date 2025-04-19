import { DomainEvent } from '../primitives/domain-event'

export class MovieCreatedDomainEvent extends DomainEvent {
    private movieId: string

    constructor(movieId: string) {
        super('movie-created-domain-event')

        this.movieId = movieId
    }

    toPrimitives() {
        return {
            movieId: this.movieId,
        }
    }
}
