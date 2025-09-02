import { Sequelize } from "sequelize-typescript";
import Config from "../../config/Config";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { Message } from "../models/Message";

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
