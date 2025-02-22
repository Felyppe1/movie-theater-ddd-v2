import {
    GetOneInput,
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
            movie_theater_id: string
            room_number: number
        }[]

        const { layout, ...data } = room.export()

        for (let row = 0; row < layout.length; row++) {
            for (let column = 0; column < layout[row].length; column++) {
                if (!layout[row][column]) continue

                chairs.push({
                    row,
                    column,
                    chair_type_id: layout[row][column]!,
                    movie_theater_id: data.movieTheaterId,
                    room_number: data.number,
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
                    movie_theater_id: data.movieTheaterId,
                    room_number: data.number,
                })),
            }),
        ])
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
                room_number: number,
                movie_theater_id: movieTheaterId,
            },
        })

        chairs.forEach(
            chair =>
                (layoutCreation[chair.row][chair.column] = chair.chair_type_id),
        )

        const technologies = await prisma.roomTechnology.findMany({
            where: {
                room_number: number,
                movie_theater_id: movieTheaterId,
            },
        })

        return new Room({
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
