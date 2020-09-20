const {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller.js");
const express = require("express");

const expenseRoutes = express.Router();
/**
 * Routes for all expenses. Evaluates to `/expenses/`.
 */
expenseRoutes.get("/", getAllExpenses).post("/", createExpense);

/**
 * Routes for a expense by id. Evalutes to `/expense/:expenseId`.
 */
expenseRoutes
  .get("/:expenseId", getExpense)
  .put("/:expenseId", updateExpense)
  .delete("/:expenseId", deleteExpense);

module.exports = expenseRoutes;
