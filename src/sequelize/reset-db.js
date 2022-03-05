// Database
import { connection } from "../config/db.config.js";
import { BudgetModel } from "./models/budget.model.js";
import { ExpenseModel } from "./models/expense.model.js";
import { UserModel } from "./models/user.model.js";

async function reset() {
  // Drop Tables
  await UserModel.drop();
  await BudgetModel.drop();
  await ExpenseModel.drop();

  // Reset the database
  await connection
    .sync({ force: true })
    .then(() => console.log("Reset Database"))
    .catch((error) => console.log("Database error: ", error));
}

reset();
