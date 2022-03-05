import { Sequelize } from "sequelize";

export const connection = new Sequelize({
  dialect: "sqlite",
  // Path relative to project root
  storage: "database/fiscal-fox-database.sqlite",
  logQueryParameters: true,
});
