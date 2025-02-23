export interface Request<T = unknown> {
    body?: T
    params?: Record<string, string>
    query?: Record<string, string | string[] | undefined>
    headers?: Record<string, string | string[] | undefined>
}

export interface Response {
    status(number: number): this
    body(data: any): this
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

export interface Controller {
    handle(request: Request, response: Response): Promise<void>
}
