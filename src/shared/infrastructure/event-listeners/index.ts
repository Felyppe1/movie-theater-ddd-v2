import '../../../bounded-contexts/movie-theater-settings/infrastructure/event-listeners'
import { movieTheaterSettingsEventListeners } from '../../../bounded-contexts/movie-theater-settings/infrastructure/event-listeners'

export async function startEventListeners() {
    await movieTheaterSettingsEventListeners()

    console.log('All event listeners were started')
}
