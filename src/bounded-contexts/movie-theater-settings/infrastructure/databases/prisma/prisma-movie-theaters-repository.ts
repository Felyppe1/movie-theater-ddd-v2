import { MovieTheatersRepository } from '../../../application/interfaces/repositories/movie-theaters-repository'
import { ChairTypePrice } from '../../../domain/core/chair-type-price'
import { MovieTheater } from '../../../domain/core/movie-theater'
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

    async getMany(): Promise<MovieTheater[]> {
        const movieTheaters = await prisma.movieTheater.findMany()

        return movieTheaters.map(
            movieTheater =>
                new MovieTheater({
                    ...movieTheater,
                    complement: movieTheater.complement ?? undefined,
                }),
        )
    }

    async getChairTypePrices(
        movieTheaterId: string,
    ): Promise<ChairTypePrice[]> {
        const chairTypePrices = await prisma.movieTheaterChairType.findMany({
            where: {
                movie_theater_id: movieTheaterId,
            },
        })

        return chairTypePrices.map(
            ({ chair_type_id, movie_theater_id, value }) =>
                new ChairTypePrice({
                    chairTypeId: chair_type_id,
                    movieTheaterId: movie_theater_id,
                    price: value,
                }),
        )
    }
}
