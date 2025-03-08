import { MoviesRepository } from '../../../application/interfaces/repositories/movies-repository'
import { Movie } from '../../../domain/core/movie-theater-settings/movie'
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
}
