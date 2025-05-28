import { movieCreatedDomainEventListener } from './movie-created-domain-event-listener'

export async function movieTheaterSettingsEventListeners() {
    await movieCreatedDomainEventListener()
}
