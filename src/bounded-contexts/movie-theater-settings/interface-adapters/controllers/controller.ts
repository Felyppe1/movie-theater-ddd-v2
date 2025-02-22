export interface Request<T = undefined> {
    body: T
    params?: Record<string, string>
    query?: Record<string, string | string[] | undefined>
    headers?: Record<string, string | string[] | undefined>
}

export interface Response<T = undefined> {
    status(number: number): this
    body(data: T): this
    cookie(name: string, value: string, data: Cookie): this
    send(): this
}

export interface Cookie {
    sameSite?: boolean | 'lax' | 'strict' | 'none'
    httpOnly?: boolean
    secure?: boolean
    expires?: Date
    domain?: string
}

export interface Controller<T = undefined, Y = undefined> {
    handle(request: Request<T>, response: Response<Y>): Promise<void>
}
