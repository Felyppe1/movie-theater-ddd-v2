import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'
import { ChairTypePrice } from '../../../domain/core/chair-type-price'
import { ChairTypePricesRepository } from '../../interfaces/repositories/chair-type-prices-repository'
import { ChairTypesRepository } from '../../interfaces/repositories/chair-types-repository'
import { MovieTheatersRepository } from '../../interfaces/repositories/movie-theaters-repository'

export interface CreateChairTypePriceServiceInput {
    movieTheaterId: string
    chairTypeId: string
    price: number
}

export class CreateChairTypePriceService {
    constructor(
        private readonly chairTypePricesRepository: ChairTypePricesRepository,
        private readonly movieTheatersRepository: MovieTheatersRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
    ) {}

    async execute(data: CreateChairTypePriceServiceInput) {
        const movieTheater = await this.movieTheatersRepository.getById(
            data.movieTheaterId,
        )

        if (!movieTheater) {
            throw new NotFoundError(
                `Movie theater id ${data.movieTheaterId} was not found`,
            )
        }

        const chairTypes = await this.chairTypesRepository.getAll()

        const chairTypeIdExists = chairTypes.some(
            chairType => chairType.getId() === data.chairTypeId,
        )

        if (!chairTypeIdExists) {
            throw new NotFoundError(
                `Chair type id ${data.chairTypeId} was not found`,
            )
        }

        const newChairTypePrice = new ChairTypePrice(data)

        await this.chairTypePricesRepository.save(newChairTypePrice)
    }
}
