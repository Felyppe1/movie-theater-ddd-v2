import {
    HasOverlappedScheduleInput,
    SessionsRepository,
} from '../../../application/interfaces/repositories/sessions-repository'
import { Session } from '../../../domain/core/session'
import { prisma } from './prisma-client'

export class PrismaSessionsRepository implements SessionsRepository {
    async hasOverlappedSchedule(
        data: HasOverlappedScheduleInput,
    ): Promise<boolean> {
        const chairs = await prisma.chair.findMany({
            where: { room_id: data.roomId },
            select: { row: true, column: true },
        })

        if (chairs.length === 0) return false // if there ain't chairs, there ain't a session

        const sessionChairs = await prisma.sessionChair.findMany({
            where: {
                OR: chairs.map(chair => ({
                    row: chair.row,
                    column: chair.column,
                    room_id: data.roomId,
                })),
            },
            select: { session_id: true },
        })

        if (sessionChairs.length === 0) return false // if no chair is in a session, there ain't time conflict

        // Buscar as sessões associadas às cadeiras encontradas
        const sessionIds = sessionChairs.map(sc => sc.session_id)
        const sessions = await prisma.session.findMany({
            where: {
                id: { in: sessionIds },
            },
            select: { datetime: true },
        })

        // Check if the new session overlaps any existing one
        return sessions.some(session => {
            const sessionEnd = new Date(
                session.datetime.getTime() + data.durationInMinutes * 60000,
            )

            return data.sessionDateTime < sessionEnd
        })

        // const overlappingSessions = await prisma.session.findMany({
        //     where: {
        //       room_id: data.roomId,
        //       datetime: {
        //         lte: new Date(data.sessionDateTime.getTime() + data.durationInMinutes * 60000), // Início antes do fim da nova sessão
        //       },
        //     },
        //   });

        // return overlappingSessions.some((session) => {
        //     const sessionEnd = new Date(session.datetime.getTime() + data.durationInMinutes * 60000);
        //     return data.sessionDateTime < sessionEnd; // Verifica se o início da nova sessão está dentro de outra
        // });
    }

    async save(session: Session): Promise<void> {
        const sessionExported = session.export()

        const chairs = await prisma.chair.findMany({
            where: {
                room_id: sessionExported.roomId,
            },
        })

        await prisma.$transaction([
            prisma.session.create({
                data: {
                    id: sessionExported.id,
                    datetime: sessionExported.schedule,
                    is_subtitled: sessionExported.isSubtitled,
                    movie_id: sessionExported.movieId,
                    technology_id: sessionExported.technologyId,
                },
            }),

            prisma.sessionChair.createMany({
                data: chairs.map(chair => ({
                    room_id: chair.room_id,
                    row: chair.row,
                    column: chair.column,
                    session_id: sessionExported.id,
                })),
            }),
        ])
    }
}
