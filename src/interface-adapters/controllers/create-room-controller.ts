import { CreateRoomService } from "../../../services/create-room-service";
import { ChairTypesRepository } from "../../driving/repositories/chair-types-repository";
import { MovieTheatersRepository } from "../../driving/repositories/movie-theaters-repository";
import { RoomsRepository } from "../../driving/repositories/rooms-repository";
import { TechnologiesRepository } from "../../driving/repositories/technologies-repository";
import { Request, Response } from "./controller";

interface CreateRoomControllerInput {
  movieTheaterId: string;
  number: number;
  layout: number[][];
  technologyIds: number[];
}

export class CreateRoomController {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly chairTypesRepository: ChairTypesRepository,
    private readonly technologiesRepository: TechnologiesRepository,
    private readonly movieTheatersRepository: MovieTheatersRepository
  ) {}

  async handle(request: Request<CreateRoomControllerInput>): Promise<Response> {
    const createRoomService = new CreateRoomService(
      this.roomsRepository,
      this.chairTypesRepository,
      this.technologiesRepository,
      this.movieTheatersRepository
    );

    const { body } = request;

    await createRoomService.execute(body);

    return { status: 200 };
  }
}
