export interface HasOverlappedScheduleInput {
    roomId: string
    sessionDateTime: Date
    durationInMinutes: number
}

export interface SessionsRepository {
    hasOverlappedSchedule(data: HasOverlappedScheduleInput): Promise<boolean>
    save(session: Session): Promise<void>
}
