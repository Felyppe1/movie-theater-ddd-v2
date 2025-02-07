import { RoomsRepository } from "../../application/rooms-respository";
import { Room } from "../../domain/core/movie-theater-settings/room";
import { prisma } from "../../prisma/prisma";

export class PrismaRoomsRepository implements RoomsRepository {
    async save(room: Room) {
        let chairs = [] as { row: number, column: number, active: boolean, room_id: string }[]

        const { layout, ...data } = room.export()

        for (let row = 0; row < layout.length; row++) {
            for (let column = 0; column < layout[row].length; column++) {
                chairs.push({
                    row,
                    column,
                    active: !!layout[row][column],
                    room_id: data.id,
                })
            }
        }
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

        // await prisma.rooms.create({
        //     id: data.id,
        //     movie_theater_id: data.movieTheaterId,
        //     number: data.number,
        //     chairs: {
        //         create: chairs
        //     },
        // })
    }

    getById(id: string): Promise<Room | null> {
        throw new Error("Method not implemented.");
    }
}