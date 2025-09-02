// src/db/sequelize.ts
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { Message } from "../models/Message";
import Config from "../../config/config";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const config = Config.getInstance();

      Database.instance = new Sequelize({
        dialect: "postgres",
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        models: [User, Room, Message],
        logging: false,
      });
    }
    return Database.instance;
  }
}

export default Database;
