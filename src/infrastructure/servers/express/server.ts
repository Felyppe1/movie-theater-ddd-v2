import 'dotenv/config'
import express, { Express } from 'express'
import { router } from './routes'

export class ExpressServer {
    private app: Express

    constructor() {
        this.app = express()

        this.app.use(express.json())
        this.app.use(router)
    }

    async startServer(port: number): Promise<void> {
        try {
            this.app.listen(port, () =>
                console.log(
                    `Express server is running on http://localhost:${port}`,
                ),
            )
        } catch (error) {
            console.error(`Failed to start server: ${error}`)
            process.exit(1)
        }
    }
}
