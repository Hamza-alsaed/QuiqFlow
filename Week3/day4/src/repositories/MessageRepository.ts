import { Message } from "../models/Message";

class MessageRepository {
  async createMessage(data: { text: string; userId: number; roomId: number }) {
    return Message.create(data);
  }

  async getRecent(limit: number) {
    return Message.findAll({ order: [["createdAt", "DESC"]], limit });
  }
}

export default new MessageRepository();
