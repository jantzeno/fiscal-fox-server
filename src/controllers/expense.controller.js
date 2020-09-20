const { ExpenseModel } = require("../sequelize/models/expense.model.js");
const config = require("../config/auth.config.js");

var jwt = require("jsonwebtoken");

exports.getAllExpenses = (req, res) => {
  const msg = "Expense - Get All Expenses";
  console.log(msg);
  res.status(200).send(msg);
};

exports.getExpense = (req, res) => {
  const msg = "Expense - Get Expense";
  console.log(msg);
  res.status(200).send(msg);
};

exports.createExpense = (req, res) => {
  const msg = "Expense - Create Expense";
  console.log(msg);
  res.status(200).send(msg);
};

exports.updateExpense = (req, res) => {
  const msg = "Expense - Update Expense";
  console.log(msg);
  res.status(200).send(msg);
};

exports.deleteExpense = (req, res) => {
  const msg = "Expense - Delete Expense";
  console.log(msg);
  res.status(200).send(msg);
};
