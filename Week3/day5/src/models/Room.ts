// src/models/Room.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Message } from "./Message";

@Table({ tableName: "rooms", timestamps: true })
export class Room extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Message)
  messages!: Message[];
}
