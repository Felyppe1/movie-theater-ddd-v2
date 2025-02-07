import { Room } from "../domain/core/movie-theater-settings/room"

export interface RoomsRepository {
    save(room: Room): Promise<void>
    getById(id: string): Promise<Room | null>
}