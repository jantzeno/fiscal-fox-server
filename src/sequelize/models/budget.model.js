const { DataTypes } = require("sequelize");
const { connection } = require("../../config/db.config.js");

exports.BudgetModel = connection.define("budget", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(60),
  },
  amount: {
    allowNull: false,
    defaultValue: 0.0,
    type: DataTypes.DECIMAL(12, 2),
  },
});
