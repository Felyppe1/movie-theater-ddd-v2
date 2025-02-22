import 'dotenv/config'
import { ExpressServer } from './servers/express-server'
import { FastifyServer } from './servers/fastify-server'

export interface Server {
    start(port: number): void
}

// const expressServer = new ExpressServer()
// expressServer.start(3333)

const fastifyServer = new FastifyServer()
fastifyServer.start(4444)
