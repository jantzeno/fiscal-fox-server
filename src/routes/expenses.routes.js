const {
  getAllExpenses,
  getAllExpensesByBudget,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller.js");
const { verifyToken } = require("../middleware/authJwt.middleware");
const { check } = require("express-validator");
const express = require("express");

const expenseRoutes = express.Router();
/**
 * Routes for all expenses. Evaluates to `/expenses/`.
 */
expenseRoutes
  .get("/", verifyToken, getAllExpenses)
  .post("/", verifyToken, createExpense);

/**
 * Routes for a expense by id. Evalutes to `/expenses/:expenseId`.
 */
expenseRoutes
  .get("/:expenseId", verifyToken, getExpense)
  .put("/:expenseId", verifyToken, updateExpense)
  .delete("/:expenseId", verifyToken, deleteExpense);

/**
 * Routes for a expenses by budget id. Evalutes to `/expenses/budget/:budgetId`.
 */
expenseRoutes.get("/budget/:budgetId", verifyToken, getAllExpensesByBudget);

module.exports = expenseRoutes;
