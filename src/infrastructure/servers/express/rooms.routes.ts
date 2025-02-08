import { Router } from "express";
import { PrismaRoomsRepository } from "../../databases/prisma/prisma-rooms-repository";
import { PrismaChairTypesRepository } from "../../databases/prisma/prisma-chairs-repository";
import { PrismaTechnologiesRepository } from "../../databases/prisma/prisma-technologies-repository";
import { PrismaMovieTheatersRepository } from "../../databases/prisma/prisma-movie-theaters-repository";
import { CreateRoomService } from "../../../application/services/create-room-service";
import { CreateRoomController } from "../../../application/ports/driven/controllers/create-room-controller";

export const roomsRouter = Router();

roomsRouter.post("/", async (req, res) => {
  const roomsRepository = new PrismaRoomsRepository();
  const chairTypesRepository = new PrismaChairTypesRepository();
  const technologiesRepository = new PrismaTechnologiesRepository();
  const movieTheatersRepository = new PrismaMovieTheatersRepository();

  const createRoomController = new CreateRoomController(
    roomsRepository,
    chairTypesRepository,
    technologiesRepository,
    movieTheatersRepository
  );

  const response = await createRoomController.handle({
    body: req.body,
  });

  res.status(response.status).json(response.body);
});
