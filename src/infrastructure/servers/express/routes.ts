import { Router } from "express";
import { roomsRouter } from "./rooms.routes";
import { movieTheatersRoutes } from "./movie-theaters.routes";

export const router = Router();

router.use('/rooms', roomsRouter)
router.use('/movie-theaters', movieTheatersRoutes)