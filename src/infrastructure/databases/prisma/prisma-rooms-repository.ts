import {
    NumberExistsInTheater,
    RoomsRepository,
} from '../../../application/interfaces/repositories/rooms-repository'
import { Room } from '../../../domain/core/movie-theater-settings/room'
import { prisma } from './prisma-client'

export class PrismaRoomsRepository implements RoomsRepository {
    async save(room: Room) {
        const chairs = [] as {
            row: number
            column: number
            chair_type_id: number
            room_id: string
        }[]

        const { layout, ...data } = room.export()

        for (let row = 0; row < layout.length; row++) {
            for (let column = 0; column < layout[row].length; column++) {
                if (!layout[row][column]) continue

                chairs.push({
                    row,
                    column,
                    chair_type_id: layout[row][column]!,
                    room_id: data.id,
                })
            }
        }

        const row_length = layout.length
        const column_length = layout[0].length

        await prisma.$transaction([
            prisma.room.create({
                data: {
                    movie_theater_id: data.movieTheaterId,
                    number: data.number,
                    row_length,
                    column_length,
                },
            }),

            prisma.chair.createMany({
                data: chairs,
            }),

            prisma.roomTechnology.createMany({
                data: data.technologyIds.map(technologyId => ({
                    technology_id: technologyId,
                    room_id: data.id,
                })),
            }),
        ])
    }

    async getById(id: string): Promise<Room | null> {
        const room = await prisma.room.findUnique({
            where: {
                id,
            },
        })

        if (!room) return null

        const layoutCreation: Room['layout'] = Array.from(
            { length: room.row_length },
            () => {
                return Array.from({ length: room.column_length })
            },
        )

        const chairs = await prisma.chair.findMany({
            where: {
                room_id: id,
            },
        })

        chairs.forEach(
            chair =>
                (layoutCreation[chair.row][chair.column] = chair.chair_type_id),
        )

        const technologies = await prisma.roomTechnology.findMany({
            where: {
                room_id: id,
            },
        })

        return new Room({
            id: room.id,
            number: room.number,
            movieTheaterId: room.movie_theater_id,
            technologyIds: technologies.map(
                technology => technology.technology_id,
            ),
            layout: layoutCreation.map(row =>
                row.map(column => column ?? null),
            ),
        })
    }

    async numberExistsInTheater(data: NumberExistsInTheater): Promise<boolean> {
        const room = await prisma.room.findFirst({
            where: {
                number: data.number,
                movie_theater_id: data.movieTheaterId,
            },
        })

        return room ? true : false
    }
}
