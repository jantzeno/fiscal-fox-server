const { DataTypes } = require("sequelize");
const { connection } = require("../../config/db.config.js");

exports.ExpenseModel = connection.define("expense", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  budgetId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(60),
  },
  amount: {
    allowNull: false,
    defaultValue: 0.0,
    type: DataTypes.DECIMAL(12, 2),
  },
});
