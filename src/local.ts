import { fastify } from './shared/infrastructure/servers/fastify'
import { startEventListeners } from './shared/infrastructure/event-listeners'

export async function startFastifyLocalServer(port = 3333) {
    try {
        await fastify.listen({ port, host: '0.0.0.0' })

        console.log(`Fastify server is running on http://localhost:${port}`)
    } catch (error) {
        console.error(`Failed to start server: ${error}`)
        process.exit(1)
    }
}

startFastifyLocalServer()
startEventListeners()
