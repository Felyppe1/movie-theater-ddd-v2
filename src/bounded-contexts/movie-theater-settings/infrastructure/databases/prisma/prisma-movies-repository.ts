import { MoviesRepository } from '../../../application/interfaces/repositories/movies-repository'
import { CLASSIFICATION, GENDER, Movie } from '../../../domain/core/movie'
import { prisma } from './prisma-client'

export class PrismaMoviesRepository implements MoviesRepository {
    async save(movie: Movie): Promise<void> {
        const {
            initialDate,
            finalDate,
            classification,
            technologyIds,
            ...data
        } = movie.export()

        await prisma.$transaction([
            prisma.movie.create({
                data: {
                    ...data,
                    classification: classification,
                    initial_date: initialDate,
                    final_date: finalDate,
                },
            }),

            prisma.movieTechnology.createMany({
                data: technologyIds.map(technologyId => ({
                    movie_id: data.id,
                    technology_id: technologyId,
                })),
            }),
        ])
    }

    async getById(id: string): Promise<Movie | null> {
        const movie = await prisma.movie.findUnique({
            where: { id },
        })

        if (!movie) return null

        const technologies = await prisma.movieTechnology.findMany({
            where: { movie_id: id },
        })

        return new Movie({
            ...movie,
            genders: movie.gender as GENDER[],
            classification: movie.classification as CLASSIFICATION,
            initialDate: movie.initial_date,
            finalDate: movie.final_date,
            technologyIds: technologies.map(
                ({ technology_id }) => technology_id,
            ),
        })
    }
}
