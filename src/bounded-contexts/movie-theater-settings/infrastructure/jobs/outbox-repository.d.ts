export interface Outbox {
    id: string
    event_name: string
    payload: any
    status: string
    created_at: Date
    updated_at: Date | null
}

export interface OutboxRepository {
    getManyPendingEvents(limit?: number): Promise<Outbox[]>
    deleteById(id: string): Promise<void>
    update(id: string, status: string): Promise<outbox>
}
