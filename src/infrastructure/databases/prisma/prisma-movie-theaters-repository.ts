import {
  HasRoomWithNumberInput,
  MovieTheatersRepository,
} from "../../../application/interfaces/repositories/movie-theaters-repository";
import { MovieTheater } from "../../../domain/core/movie-theater-settings/movie-theater";
import { prisma } from "./prisma-client";

export class PrismaMovieTheatersRepository implements MovieTheatersRepository {
  save(movieTheater: MovieTheater): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<MovieTheater | null> {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: { id },
      include: {
        chairTypes: true,
      },
    });

    if (!movieTheater) return null;

    const chairs = new Map<number, number>();

    movieTheater.chairTypes.map(({ value, chair_type_id }) => {
      if (value) chairs.set(chair_type_id, value);
    });

    return new MovieTheater({
      ...movieTheater,
      chairs,
      complement: movieTheater.complement ?? undefined,
    });
  }

  async hasRoomWithNumber({
    id,
    roomNumber,
  }: HasRoomWithNumberInput): Promise<boolean> {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });

    return movieTheater!.rooms.some((room) => room.number === roomNumber);
  }
}
