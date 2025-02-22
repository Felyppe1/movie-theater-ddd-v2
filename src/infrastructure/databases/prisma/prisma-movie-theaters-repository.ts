import { MovieTheatersRepository } from '../../../application/interfaces/repositories/movie-theaters-repository'
import { MovieTheater } from '../../../domain/core/movie-theater-settings/movie-theater'
import { prisma } from './prisma-client'

export class PrismaMovieTheatersRepository implements MovieTheatersRepository {
    async save(movieTheater: MovieTheater): Promise<void> {
        await prisma.movieTheater.create({
            data: movieTheater.export(),
        })
    }

    async getById(id: string): Promise<MovieTheater | null> {
        const movieTheater = await prisma.movieTheater.findUnique({
            where: { id },
        })

        if (!movieTheater) return null

        return new MovieTheater({
            ...movieTheater,
            complement: movieTheater.complement ?? undefined,
        })
    }
}
