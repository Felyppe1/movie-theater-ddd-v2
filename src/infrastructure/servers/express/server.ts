import 'dotenv/config'
import express, { Express, ErrorRequestHandler } from 'express'
import { router } from './routes'
import 'express-async-errors'
import { ZodError } from 'zod'

export class ExpressServer {
    private app: Express

    constructor() {
        this.app = express()

        this.app.use(express.json())
        this.app.use(router)

        this.app.use(((error, request, response, next) => {
            console.error('EXPRESS ERROR HANDLER', error)

            if (error instanceof ZodError) {
                response.status(400).json({
                    message: 'Validation error',
                    issues: error.format(),
                })

                return
            }

            response.status(500).json({
                message: `Internal server error: ${error.message}`,
            })

            return
        }) as ErrorRequestHandler)
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
