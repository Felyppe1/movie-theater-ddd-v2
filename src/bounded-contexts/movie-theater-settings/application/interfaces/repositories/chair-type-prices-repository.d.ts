import { ChairTypePrice } from '../../../domain/core/chair-type-price'

export interface GetManyInput {
    movieTheaterId: string
    chairTypeIds: string[]
}

export interface ChairTypePricesRepository {
    getMany(data: GetManyInput): Promise<ChairTypePrice[]>
    save(chairTypePrice: ChairTypePrice): Promise<void>
}
