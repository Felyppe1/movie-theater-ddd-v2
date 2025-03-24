import {
    ChairTypePricesRepository,
    GetManyInput,
} from '../../../application/interfaces/repositories/chair-type-prices-repository'
import { ChairTypePrice } from '../../../domain/core/chair-type-price'
import { prisma } from './prisma-client'

export class PrismaChairTypePricesRepository
    implements ChairTypePricesRepository
{
    async getMany(data: GetManyInput): Promise<ChairTypePrice[]> {
        const chairTypePrices = await prisma.movieTheaterChairType.findMany({
            where: {
                chair_type_id: {
                    in: data.chairTypeIds.map(chairTypeId => chairTypeId),
                },
                movie_theater_id: data.movieTheaterId,
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

    async save(chairTypePrice: ChairTypePrice): Promise<void> {
        const chairTypePriceExported = chairTypePrice.export()

        await prisma.movieTheaterChairType.create({
            data: {
                chair_type_id: chairTypePriceExported.chairTypeId,
                movie_theater_id: chairTypePriceExported.movieTheaterId,
                value: chairTypePriceExported.price,
            },
        })
    }
}
