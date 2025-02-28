export interface Request<T = unknown> {
    body?: T
    params?: Record<string, string>
    query?: Record<string, string>
    headers?: Record<string, string>
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

// It must receive the typing through here and pass it to the handle method because if not then the T received by Request and Response will always be the default value
export interface Controller<T = undefined, Y = undefined> {
    handle(request: Request<T>, response: Response<Y>): Promise<void>
}
