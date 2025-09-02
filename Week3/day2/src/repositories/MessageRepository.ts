import { Message } from "../models/Message";

export class MessageRepository {
  createMessage(data: Partial<Message>) {
    return Message.create(data);
  }
  getMessagesByRoom(roomId: number) {
    return Message.findAll({ where: { roomId } });
  }
}
