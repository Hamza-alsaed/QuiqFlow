import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { Message } from "../models/Message";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize({
        dialect: "postgres",
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT) || 5433,
        username: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "admin",
        database: process.env.DB_NAME || "chatapp",
        models: [User, Room, Message],
        logging: false,
      });
    }
    return Database.instance;
  }
}

export default Database;
