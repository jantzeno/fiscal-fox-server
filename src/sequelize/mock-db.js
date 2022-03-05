import { connection } from "../config/db.config.js";
import { BudgetModel } from "./models/budget.model.js";
import { ExpenseModel } from "./models/expense.model.js";
import { UserModel } from "./models/user.model.js";

import { hashSync } from "bcrypt";
const saltRounds = 10;

async function mock() {
  console.log("Loading mock data into SQLite database");

  // Drop Tables
  await UserModel.drop();
  await BudgetModel.drop();
  await ExpenseModel.drop();

  await connection.sync({ force: true });

  await UserModel.bulkCreate([
    {
      username: "mrfox",
      password: hashSync("incredible", saltRounds),
      email: "mrfox@burrow.com",
      role: "PROGRAM_MANAGER",
    },
    {
      username: "boggis",
      password: hashSync("farmer", saltRounds),
      email: "boggis@squabfarm.com",
      role: "BUDGET_ANALYST",
    },
  ]);

  await BudgetModel.bulkCreate([
    { name: "IT Refresh", amount: 2000 },
    { name: "Christmas Party", amount: 500 },
  ]);

  await ExpenseModel.bulkCreate([
    { name: "Software License", budgetId: 1, amount: 500 },
    { name: "Copier Lease", budgetId: 1, amount: 200 },
    { name: "Laptop Refresh", budgetId: 1, amount: 2000 },
  ]);

  console.log("Done!");
}

mock();
