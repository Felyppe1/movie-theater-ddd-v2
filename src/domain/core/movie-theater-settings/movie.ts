import { randomUUID } from 'crypto'
import { InvalidDataError } from '../../errors/invalid-data-error'

export enum GENDER {
    HORROR = 'HORROR',
    COMEDY = 'COMEDY',
    ACTION = 'ACTION',
}

export enum CLASSIFICATION {
    L = 'L',
    // TEN = '10',
    TWELVE = 'TWELVE',
    // FOURTEEN = '14',
    // SIXTEEN = '16',
}

export interface MovieInput {
    id: string
    name: string
    synopsis: string
    duration: number
    poster: string
    subtitled: boolean
    genders: GENDER[]
    classification: CLASSIFICATION
    technologyIds: string[]
    initialDate: Date
    finalDate: Date
}

export interface CreateMovieInput extends Omit<MovieInput, 'id'> {}

export class Movie {
    private id: string
    private name: string
    private synopsis: string
    private duration: number // Should be a Value Object
    private poster: string
    private subtitled: boolean
    private genders: GENDER[]
    private classification: CLASSIFICATION
    private technologyIds: string[]
    private initialDate: Date
    private finalDate: Date

    static create(data: CreateMovieInput) {
        return new Movie({
            id: randomUUID(),
            ...data,
        })
    }

    constructor({
        id,
        name,
        synopsis,
        duration,
        poster,
        subtitled,
        genders,
        classification,
        technologyIds,
        initialDate,
        finalDate,
    }: MovieInput) {
        if (!id) {
            throw new InvalidDataError('Id is required for Movie')
        }

        if (!name) {
            throw new InvalidDataError('Name is required for Movie')
        }

        if (!synopsis) {
            throw new InvalidDataError('Synopsis is required for Movie')
        }

        if (!duration) {
            throw new InvalidDataError('Duration is required for Movie')
        }

        if (!poster) {
            throw new InvalidDataError('Poster is required for Movie')
        }

        if (subtitled === undefined) {
            throw new InvalidDataError('Subtitled is required for Movie')
        }

        if (!genders || genders.length === 0) {
            throw new InvalidDataError('Gender is required for Movie')
        }

        if (!classification) {
            throw new InvalidDataError('Classification is required for Movie')
        }

        if (!technologyIds || technologyIds.length === 0) {
            throw new InvalidDataError('Technology ids are required for Movie')
        }

        if (!initialDate) {
            throw new InvalidDataError('InitialDate is required for Movie')
        }

        if (!finalDate) {
            throw new InvalidDataError('FinalDate is required for Movie')
        }

        this.id = id
        this.name = name
        this.synopsis = synopsis
        this.poster = poster
        this.duration = duration
        this.subtitled = subtitled
        this.genders = genders
        this.classification = classification
        this.technologyIds = technologyIds
        this.initialDate = initialDate
        this.finalDate = finalDate
    }

    getId() {
        return this.id
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            synopsis: this.synopsis,
            duration: this.duration,
            poster: this.poster,
            subtitled: this.subtitled,
            gender: this.genders,
            classification: this.classification,
            technologyIds: this.technologyIds,
            initialDate: this.initialDate,
            finalDate: this.finalDate,
        }
    }
}
