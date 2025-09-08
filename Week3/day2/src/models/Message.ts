// src/models/Message.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({ tableName: "messages", timestamps: true })
export class Message extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  content!: string;

  @ForeignKey(() => require("./User").User)
  @Column
  userId!: number;

  @BelongsTo(() => require("./User").User)
  user!: any;

  @ForeignKey(() => require("./Room").Room)
  @Column
  roomId!: number;

  @BelongsTo(() => require("./Room").Room)
  room!: any;
}
