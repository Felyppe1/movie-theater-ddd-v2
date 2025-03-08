import {
    CLASSIFICATION,
    GENDER,
} from '../../../domain/core/movie-theater-settings/movie'

export interface CreateMovieServiceInput {
    name: string
    synopsis: string
    duration: number
    subtitled: boolean
    genders: GENDER[]
    classification: CLASSIFICATION
    technologyIds: string[]
    initialDate: Date
    finalDate: Date
    base64Poster: string
}
