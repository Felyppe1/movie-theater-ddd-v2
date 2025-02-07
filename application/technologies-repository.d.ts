export interface GetAllOutput {
    id: number
    name: string
    percentageIncrease: number
}

export interface TechnologiesRepository {
    getAll(): Promise<GetAllOutput[]>
}