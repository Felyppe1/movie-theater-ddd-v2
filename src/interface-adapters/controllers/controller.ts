export interface Request<T = undefined> {
    body: T
    params?: Record<string, string>
    query?: Record<string, string | string[] | undefined>
    headers?: Record<string, string | string[] | undefined>
}

export interface Response<T = undefined> {
    status: number
    body?: T
}
