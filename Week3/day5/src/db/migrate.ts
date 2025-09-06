// src/db/migrate.ts
import { Sequelize } from "sequelize-typescript";
import { Umzug, SequelizeStorage } from "umzug";
import Database from "./sequelize"; // your singleton Sequelize

const sequelize = Database.getInstance();

const umzug = new Umzug({
  migrations: { glob: 'src/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const migrate = async () => {
  await umzug.up();
  console.log("Migrations completed");
};

migrate().catch(err => console.error(err));
