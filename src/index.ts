import {
    fastify,
    startFastifyLocalServer,
} from './shared/infrastructure/servers/fastify'
import './shared/infrastructure/event-listeners/gcp'

export default async (req: any, res: any) => {
    await fastify.ready()
    fastify.server.emit('request', req, res)
}

// startFastifyLocalServer()
