import { Message } from "../models/Message";

class MessageRepository {
  async createMessage(data: { text: string; userId: number; roomId: number }) {
    return await Message.create(data);
  }

  async getRecent(limit: number) {
    return await Message.findAll({ order: [["createdAt", "DESC"]], limit });
  }

  async getMessagesByRoom(roomId: number) {
    return await Message.findAll({ where: { roomId } });
  }
}

export default new MessageRepository();
