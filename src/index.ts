import { fastify } from './shared/infrastructure/servers/fastify'
import { startEventListeners } from './shared/infrastructure/event-listeners'

startEventListeners()

export default async (req: any, res: any) => {
    await fastify.ready()

    fastify.server.emit('request', req, res)
}
