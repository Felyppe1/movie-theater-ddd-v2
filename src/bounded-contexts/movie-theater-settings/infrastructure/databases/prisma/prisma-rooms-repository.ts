import {
    GetOneInput,
    RoomsRepository,
} from '../../../application/interfaces/repositories/rooms-repository'
import { Room } from '../../../domain/core/room'
import { prisma } from './prisma-client'

export class PrismaRoomsRepository implements RoomsRepository {
    async save(room: Room) {
        const chairs = [] as {
            row: number
            column: number
            chair_type_id: number
        }[]

        const { layout, ...data } = room.export()

        for (let row = 0; row < layout.length; row++) {
            for (let column = 0; column < layout[row].length; column++) {
                if (!layout[row][column]) continue

                chairs.push({
                    row,
                    column,
                    chair_type_id: layout[row][column]!,
                })
            }
        }

        const row_length = layout.length
        const column_length = layout[0].length
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
        // const roomExported = room.export();

        await prisma.room.create({
            data: {
                movie_theater_id: data.movieTheaterId,
                number: data.number,
                row_length,
                column_length,
                chairs: {
                    createMany: {
                        data: chairs,
                    },
                },
                technologies: {
                    create: data.technologyIds.map(id => ({
                        technology: {
                            connect: {
                                id,
                            },
                        },
                    })),
                },
            },
        })
    }

    async getOne({
        number,
        movieTheaterId,
    }: GetOneInput): Promise<Room | null> {
        const room = await prisma.room.findUnique({
            where: {
                number_movie_theater_id: {
                    number,
                    movie_theater_id: movieTheaterId,
                },
            },
            include: {
                technologies: true,
                chairs: true,
            },
        })

        if (!room) return null

        const layoutCreation: Room['layout'] = Array.from(
            { length: room.row_length },
            () => {
                return Array.from({ length: room.column_length })
            },
        )

        room.chairs.forEach(
            chair =>
                (layoutCreation[chair.row][chair.column] = chair.chair_type_id),
        )

        return new Room({
            number: room.number,
            movieTheaterId: room.movie_theater_id,
            technologyIds: room.technologies.map(
                technology => technology.technology_id,
            ),
            layout: layoutCreation.map(row =>
                row.map(column => column ?? null),
            ),
        })
    }
}
