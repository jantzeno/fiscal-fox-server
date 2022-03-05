import { DataTypes } from "sequelize";
import { connection } from "../../config/db.config.js";

export const ExpenseModel = connection.define("expense", {
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
