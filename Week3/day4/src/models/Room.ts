// src/models/Room.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: "rooms", timestamps: true })
export class Room extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  // Lazy association to resolve circular import
  @HasMany(() => require("./Message").Message)
  messages!: any[];
}
