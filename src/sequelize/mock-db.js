const { connection } = require("../config/db.config.js");
const { BudgetModel } = require("./models/budget.model.js");
const { ExpenseModel } = require("./models/expense.model.js");
const { UserModel } = require("./models/user.model.js");

async function mock() {
  console.log("Loading mock data into SQLite database");

  await connection.sync({ force: true });

  await UserModel.bulkCreate([
    {
      username: "mrfox",
      password: "incredible",
      email: "mrfox@burrow.com",
      role: "PROGRAM_MANAGER",
    },
    {
      username: "boggis",
      password: "farmer",
      email: "boggis@squabfarm.com",
      role: "BUDGET_ANALYST",
    },
  ]);

  await BudgetModel.bulkCreate([
    { name: "IT Refresh", amount: 2000 },
    { name: "Christmas Party", amount: 500 },
  ]);

  await ExpenseModel.bulkCreate([
    { name: "Software License", budget_id: 1, amount: 500 },
    { name: "Copier Lease", budget_id: 1, amount: 200 },
    { name: "Laptop Refresh", budget_id: 1, amount: 2000 },
  ]);

  console.log("Done!");
}

mock();
