import 'dotenv/config'
import express, { Express } from 'express'
import { Server } from '..'
import { movieTheaterSettingsRoutes } from '../bounded-contexts/movie-theater-settings/infrastructure/servers/express'

export class ExpressServer implements Server {
    private app: Express

    constructor() {
        this.app = express()

        this.app.use(express.json())
        this.app.use(movieTheaterSettingsRoutes)
    }

    start(port: number) {
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
