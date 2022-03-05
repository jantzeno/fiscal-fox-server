import { getExpenses, getExpensesByBudgetId, getExpense, createExpense, updateExpense, deleteExpense } from "../controllers/expense.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { Router } from "express";

const expenseRoutes = Router();
/**
 * Routes for all expenses. Evaluates to `/expenses/`.
 */
expenseRoutes.get("/", getExpenses).post("/", verifyToken, createExpense);

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
expenseRoutes.get("/budget/:budgetId", verifyToken, getExpensesByBudgetId);

export default expenseRoutes;
