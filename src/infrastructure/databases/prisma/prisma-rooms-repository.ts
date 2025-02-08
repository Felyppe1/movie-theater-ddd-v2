import {
  GetOneInput,
  RoomsRepository,
} from "../../../application/interfaces/repositories/rooms-repository";
import { Room } from "../../../domain/core/movie-theater-settings/room";
import { prisma } from "./prisma-client";

export class PrismaRoomsRepository implements RoomsRepository {
  async save(room: Room) {
    // let chairs = [] as {
    //     row: number
    //     column: number
    //     active: boolean
    // }[]

    // const { layout, ...data } = room.export();

    // for (let row = 0; row < layout.length; row++) {
    //     for (let column = 0; column < layout[row].length; column++) {
    //         chairs.push({
    //             row,
    //             column,
    //             active: !!layout[row][column],
    //         });
    //     }
    // }
    // const chairs:object[] = layout.reduce((acc, row, rowIndex) => {
    //     const mappedRow = row.map((column, columnIndex) => {
    //         return {
    //             row: rowIndex,
    //             column: columnIndex,
    //             active: !!column,
    //             room_id: data.id,
    //         }
    //     })
    //     return acc.concat(mappedRow)
    // }, [])
    const roomExported = room.export();

    await prisma.room.create({
      data: {
        movie_theater_id: roomExported.movieTheaterId,
        number: roomExported.number,
        chairs: roomExported.layout,
        technologies: {
          create: roomExported.technologyIds.map((id) => ({
            technology: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });
  }

  async getOne({ number, movieTheaterId }: GetOneInput): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        number_movie_theater_id: {
          number,
          movie_theater_id: movieTheaterId,
        },
      },
      include: {
        technologies: true,
      },
    });

    if (!room) return null;

    return new Room({
      number: room.number,
      movieTheaterId: room.movie_theater_id,
      technologyIds: room.technologies.map(
        (technology) => technology.technology_id
      ),
      layout: room.chairs as (number | null)[][],
    });
  }
}
