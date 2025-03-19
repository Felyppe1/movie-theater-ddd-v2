#!/usr/bin/env node
// This tells OS which interpreter to use

import { Command } from 'commander'
import { PrismaRoomsRepository } from '../../databases/prisma/prisma-rooms-repository'
import { PrismaChairTypesRepository } from '../../databases/prisma/prisma-chair-types-repository'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { PrismaMovieTheatersRepository } from '../../databases/prisma/prisma-movie-theaters-repository'

export const program = new Command()

program
    .name('movie-theater-cli')
    .description('CLI for the Movie Theater')
    .version('1.0.0')

program
    .command('create-room')
    .description('Create a new room for a movie theater')
    .requiredOption('-t, --theater <id>', 'ID do cinema')
    .requiredOption('-n, --number <number>', 'Número da sala', parseInt)
    .requiredOption(
        '-l, --layout <matrix>',
        'Layout das cadeiras (ex: "[[1,1],[0,1]]")',
    )
    .requiredOption('--tech, --technologies <ids...>', 'IDs das tecnologias')
    .action(async options => {
        const roomsRepository = new PrismaRoomsRepository()
        const chairTypesRepository = new PrismaChairTypesRepository()
        const technologiesRepository = new PrismaTechnologiesRepository()
        const movieTheatersRepository = new PrismaMovieTheatersRepository()

        // const createRoomCommand = new CreateRoomCommand(
        //     roomsRepository,
        //     chairTypesRepository,
        //     technologiesRepository,
        //     movieTheatersRepository,
        // )

        // await createRoomCommand.run(options)
    })

program.parse(process.argv)
