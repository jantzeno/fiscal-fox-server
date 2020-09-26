// Database
const { connection } = require("../config/db.config.js");
const { BudgetModel } = require("./models/budget.model.js");
const { ExpenseModel } = require("./models/expense.model.js");
const { UserModel } = require("./models/user.model.js");

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
