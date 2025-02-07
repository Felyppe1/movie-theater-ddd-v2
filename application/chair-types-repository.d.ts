export interface GetAllOutput {
    id: number
    name: string
}

export interface ChairTypesRepository {
    getAll(): Promise<GetAllOutput[]>
}