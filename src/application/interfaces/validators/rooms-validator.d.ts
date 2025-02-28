import { CreateRoomServiceInput } from '../../services/create-room-service'
import { UpdateRoomServiceInput } from '../../services/update-room-service'

export interface RoomsValidator {
    createData(data: CreateRoomServiceInput): CreateRoomServiceInput
    updateData(data: UpdateRoomServiceInput): UpdateRoomServiceInput
}
