import { describe, it, expect } from 'vitest'
import { Room } from './room'

describe('Room', () => {
    it('should be able to create a room successfully', () => {
        Room.create({
            movieTheaterId: '1',
            number: 1,
            technologyIds: [1],
            layout: [[1]],
        })
    })

    // it('should NOT be able to create a room with chair types that do not exist', () => {
    //     expect(() =>
    //         Room.create({
    //             movieTheaterId: '1',
    //             number: 1,
    //             technologyIds: [1],
    //             layout: [[999]],
    //         })
    //     ).toThrow('Chair type id 999 does not exist')
    // })

    // it('should NOT be able to create a room with technologies that do not exist', () => {
    //     expect(() =>
    //         Room.create({
    //             movieTheaterId: '1',
    //             number: 1,
    //             technologyIds: [999],
    //             layout: [[1]],
    //         })
    //     ).toThrow('Technology id 999 does not exist')
    // })

    describe('should NOT be able to create a room when the layout', () => {
        it('has no rows', () => {
            expect(
                () =>
                    new Room({
                        movieTheaterId: '1',
                        number: 1,
                        technologyIds: [1],
                        layout: [],
                    }),
            ).toThrow('The room layout field is required')
        })

        it('has no columnn', () => {
            expect(
                () =>
                    new Room({
                        movieTheaterId: '1',
                        number: 1,
                        technologyIds: [1],
                        layout: [[]],
                    }),
            ).toThrow('The room layout field is required')
        })

        it('has only null columns', () => {
            expect(
                () =>
                    new Room({
                        movieTheaterId: '1',
                        number: 1,
                        technologyIds: [1],
                        layout: [[null]],
                    }),
            ).toThrow('The room layout field is required')
        })

        it('has rows with different lengths', () => {
            expect(
                () =>
                    new Room({
                        movieTheaterId: '1',
                        number: 1,
                        technologyIds: [1],
                        layout: [[1], [1, 1]],
                    }),
            ).toThrow(
                'The length of line 2 is not equal to the length of the first line',
            )
        })
    })
})
