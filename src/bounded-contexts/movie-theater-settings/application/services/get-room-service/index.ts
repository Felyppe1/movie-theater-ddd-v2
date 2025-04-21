import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error'
import { DatabaseConnector } from '../../interfaces/database/database-connector'

export class GetRoomService {
    constructor(private readonly databaseConnector: DatabaseConnector) {}

    async execute(id: string) {
        const [room] = await this.databaseConnector.query<
            {
                id: string
                movieTheaterId: string
                number: number
                rowLength: number
                columnLength: number
                chairs: {
                    row: number
                    column: number
                    chairTypeId: number
                }
                technologyIds: string[]
            }[]
        >(
            `
            SELECT
                r.id,
                r.number,
                r.movie_theater_id "movieTheaterId",
                r.row_length "rowLength",
                r.column_length "columnLength",
                (
                    SELECT json_agg(
                        json_build_object(
                            'row', c.row,
                            'column', c.column,
                            'chairTypeId', c.chair_type_id
                        )
                    )
                    FROM chair c
                    WHERE c.room_id = r.id
                ) chairs,
                (
                    SELECT array_agg(rt.technology_id)
                    FROM room_technology rt
                    WHERE rt.room_id = r.id
                ) "technologyIds"
            FROM room r
            WHERE id = $1`,
            [id],
        )

        if (!room) {
            throw new NotFoundError(`Room was not found`)
        }

        return room
    }
}
