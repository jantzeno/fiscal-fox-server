const { Sequelize } = require("sequelize");

exports.connection = new Sequelize({
  dialect: "sqlite",
  // Path relative to project root
  storage: "database/fiscal-fox-database.sqlite",
  logQueryParameters: true,
});
