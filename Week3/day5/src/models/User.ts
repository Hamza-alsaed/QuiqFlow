import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Message } from "./Message";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [8, 128] } })
  password!: string;

  @HasMany(() => Message)
  messages!: Message[];
}
