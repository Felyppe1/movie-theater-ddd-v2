import "dotenv/config";

import { ExpressServer } from "./infrastructure/servers/express/server";
import { FastifyServer } from "./infrastructure/servers/fastify/server";

const expressServer = new ExpressServer();
// const fastifyServer = new FastifyServer();

expressServer.startServer(3333);
// fastifyServer.startServer(4444);
