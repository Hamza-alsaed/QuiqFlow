// src/models/Message.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Room } from "./Room";

@Table({ tableName: "messages", timestamps: true })
export class Message extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @Column
  roomId!: number;

  @BelongsTo(() => Room)
  room!: Room;
}
