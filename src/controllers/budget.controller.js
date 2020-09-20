const { BudgetModel } = require("../sequelize/models/budget.model.js");
const config = require("../config/auth.config.js");

var jwt = require("jsonwebtoken");

exports.getAllBudgets = (req, res) => {
  const msg = "Budget - Get All Budgets";
  console.log(msg);
  res.status(200).send(msg);
};

exports.getBudget = (req, res) => {
  const msg = "Budget - Get Budget";
  console.log(msg);
  res.status(200).send(msg);
};

exports.createBudget = (req, res) => {
  const msg = "Budget - Create Budget";
  console.log(msg);
  res.status(200).send(msg);
};

exports.updateBudget = (req, res) => {
  const msg = "Budget - Update Budget";
  console.log(msg);
  res.status(200).send(msg);
};

exports.deleteBudget = (req, res) => {
  const msg = "Budget - Delete Budget";
  console.log(msg);
  res.status(200).send(msg);
};
