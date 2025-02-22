import { ChairTypesRepository } from '../../application/interfaces/repositories/chair-types-repository'
import { MovieTheatersRepository } from '../../application/interfaces/repositories/movie-theaters-repository'
import { RoomsRepository } from '../../application/interfaces/repositories/rooms-repository'
import { TechnologiesRepository } from '../../application/interfaces/repositories/technologies-repository'
import { CreateRoomService } from '../../application/services/create-room-service'

export class CreateRoomCommand {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chairTypesRepository: ChairTypesRepository,
        private readonly technologiesRepository: TechnologiesRepository,
        private readonly movieTheatersRepository: MovieTheatersRepository,
    ) {}

    async run(args: string[]) {
        if (args.length < 5) {
            console.error(
                'Uso: node cli.js create-room <movieTheaterId> <number> <layout> <technologyIds>',
            )
            console.error(
                'Exemplo: node cli.js create-room 1 5 "[[1,0],[0,1]]" "[1,2,3]"',
            )
            process.exit(1)
        }

        const movieTheaterId = args[2]
        const number = parseInt(args[3])
        const layout = JSON.parse(args[4])
        const technologyIds = JSON.parse(args[5])

        if (!Array.isArray(layout) || !Array.isArray(technologyIds)) {
            console.error('Erro: layout e technologyIds devem ser arrays.')
            process.exit(1)
        }

        const createRoomService = new CreateRoomService(
            this.roomsRepository,
            this.chairTypesRepository,
            this.technologiesRepository,
            this.movieTheatersRepository,
        )

        try {
            await createRoomService.execute({
                movieTheaterId,
                number,
                layout,
                technologyIds,
            })

            console.log('Sala criada com sucesso!')
        } catch (error) {
            console.error('Erro ao criar sala:', error)

            process.exit(1)
        }
    }
}
