import { Router } from 'express'
import { roomsRouter } from './rooms.routes'
import { movieTheatersRoutes } from './movie-theaters.routes'
import { technologiesRouter } from './technologies.routes'

export const movieTheaterSettingsRoutes = Router()

movieTheaterSettingsRoutes.use('/rooms', roomsRouter)
movieTheaterSettingsRoutes.use('/movie-theaters', movieTheatersRoutes)
movieTheaterSettingsRoutes.use('/technologies', technologiesRouter)
