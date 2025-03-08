import { FastifyReply, FastifyRequest } from 'fastify'
import {
    Cookie,
    Request,
    Response,
} from '../../../interface-adapters/controllers/controller'
import { MultipartFile } from '@fastify/multipart'

export async function normalizeFastifyRequest<T = unknown>(
    req: FastifyRequest,
): Promise<Request<T>> {
    let file: MultipartFile | undefined
    let body: Record<string, any> = {}

    if (req.isMultipart()) {
        const parts = req.parts()
        for await (const part of parts) {
            if (part.type === 'file') {
                file = part
            } else {
                body[part.fieldname] = part.value
            }
        }
    } else {
        body = req.body as Record<string, any>
    }

    return {
        body: body as T,
        params: req.params as Record<string, string>,
        query: Object.fromEntries(
            Object.entries(req.query as Record<string, any>).map(
                ([key, value]) => [key, String(value)],
            ),
        ) as Record<string, string>,
        headers: Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
                key,
                String(value),
            ]),
        ) as Record<string, string>,
        file: file
            ? {
                  filename: file.filename,
                  fieldname: file.fieldname,
                  mimetype: file.mimetype,
                  file: file.file,
                  toBuffer: async (): Promise<Buffer> => {
                      const chunks: Buffer[] = []

                      for await (const chunk of file.file) {
                          chunks.push(chunk)
                      }

                      return Buffer.concat(chunks)
                  },
              }
            : undefined,
    }
}

export class FastifyResponseAdapter implements Response<any> {
    private statusCode: number = 200
    private data?: any

    constructor(private reply: FastifyReply) {}

    status(statusCode: number): this {
        this.statusCode = statusCode

        return this
    }

    body(data: any): this {
        this.data = data

        return this
    }

    cookie(name: string, value: string, data: Cookie): this {
        this.reply.cookie(name, value, data)

        return this
    }

    send(): this {
        if (!this.data) {
            this.reply.status(this.statusCode).send()

            return this
        }

        this.reply.status(this.statusCode).send(this.data)

        return this
    }
}
