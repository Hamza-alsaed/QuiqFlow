import { Room } from "../models/Room";

export class RoomRepository {
  createRoom(data: Partial<Room>) {
    return Room.create(data);
  }
  getAllRooms() {
    return Room.findAll();
  }
}
