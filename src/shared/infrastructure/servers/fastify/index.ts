import 'dotenv/config'
import Fastify from 'fastify'
import fastifyCookie from 'fastify-cookie'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { movieTheaterSettingsRoutes } from '../../../../bounded-contexts/movie-theater-settings/infrastructure/servers/fastify/routes'
import { InvalidDataError } from '../../../domain/errors/invalid-data-error'
import { NotFoundError } from '../../../domain/errors/not-found-error'
import { ConflictError } from '../../../domain/errors/conflict-error'

export const fastify = Fastify()

fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
})

fastify.register(fastifyCookie)

fastify.register(multipart)

fastify.register(movieTheaterSettingsRoutes)

fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof InvalidDataError) {
        return reply.status(400).send({ error: error.message })
    }

    if (error instanceof NotFoundError) {
        return reply.status(404).send({ error: error.message })
    }

    if (error instanceof ConflictError) {
        return reply.status(409).send({ error: error.message })
    }

    return reply.status(500).send({ error: error.message })
})
