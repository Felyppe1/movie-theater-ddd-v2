import { MovieTheater } from "../../domain/core/movie-theater-settings/movie-theater";
import { ChairTypesRepository } from "../interfaces/repositories/chair-types-repository";
import { MovieTheatersRepository } from "../interfaces/repositories/movie-theaters-repository";

interface CreateMovieTheaterInput {
  chairs: {
    id: number;
    value: number;
  }[];
  number: string;
  complement?: string;
  zipCode: string;
  street: string;
  city: string;
  state: string;
}

export class CreateMovieTheaterService {
  constructor(
    private readonly movieTheatersRepository: MovieTheatersRepository,
    private readonly chairTypesRepository: ChairTypesRepository
  ) {}

  async execute({ chairs, ...data }: CreateMovieTheaterInput) {
    if (chairs.length > 0) {
        const chairTypes = await this.chairTypesRepository.getAll();
    
        const chairTypeIds = chairTypes.map((chairType) => chairType.getId());
    
        const chairTypeDoesNotExist = chairs.find(
          (chair) => !chairTypeIds.includes(chair.id)
        );
        
        if (chairTypeDoesNotExist) {
          throw Error(`Chair type id ${chairTypeDoesNotExist.id} does not exist`)
        }
    }

    const movieTheater = MovieTheater.create({ chairs, ...data });

    await this.movieTheatersRepository.save(movieTheater);

    return movieTheater.getId();
  }
}
