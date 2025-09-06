// src/models/User.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true }) // lowercase to match DB
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  // Lazy association to resolve circular import
  @HasMany(() => require("./Message").Message)
  messages!: any[];
}
