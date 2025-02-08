import Fastify, { FastifyInstance } from "fastify";
import { router } from "./routes";

export class FastifyServer {
  private app: FastifyInstance;

  constructor() {
    this.app = Fastify();

    this.app.register(router);
  }

  async startServer(port: number): Promise<void> {
    try {
      await this.app.listen({ port, host: "0.0.0.0" });

      console.log(`Fastify server is running on http://localhost:${port}`);
    } catch (error) {
      console.error(`Failed to start server: ${error}`);
      process.exit(1);
    }
  }
}
