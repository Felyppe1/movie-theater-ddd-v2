import { PrismaRoomsRepository } from "../../databases/prisma/prisma-rooms-repository";
import { PrismaChairTypesRepository } from "../../databases/prisma/prisma-chairs-repository";
import { PrismaTechnologiesRepository } from "../../databases/prisma/prisma-technologies-repository";
import { PrismaMovieTheatersRepository } from "../../databases/prisma/prisma-movie-theaters-repository";
import { CreateRoomService } from "../../../application/services/create-room-service";
import { CreateRoomController } from "../../../application/ports/driven/controllers/create-room-controller";
import { FastifyInstance } from "fastify";

export async function router(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      const roomsRepository = new PrismaRoomsRepository();
      const chairTypesRepository = new PrismaChairTypesRepository();
      const technologiesRepository = new PrismaTechnologiesRepository();
      const movieTheatersRepository = new PrismaMovieTheatersRepository();

      const createRoomSerivce = new CreateRoomService(
        roomsRepository,
        chairTypesRepository,
        technologiesRepository,
        movieTheatersRepository
      );

      const createRoomController = new CreateRoomController(createRoomSerivce);

      const response = await createRoomController.handle({
        body: request.body as any,
      });

      return reply.status(response.status).send();
    },
  });
}
