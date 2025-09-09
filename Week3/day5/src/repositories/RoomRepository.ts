import { Room } from "../models/Room";

export class RoomRepository {
  async createRoom(data: Partial<Room>) {
    return await Room.create(data);
  }
  async getAllRooms() {
    return await Room.findAll();
  }
}
