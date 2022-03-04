const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budget.controller.js");
const { verifyToken } = require("../middleware/authJwt.middleware");
const express = require("express");

const budgetRoutes = express.Router();
/**
 * Routes for all budgets. Evaluates to `/budgets/`.
 */
budgetRoutes.get("/", verifyToken, getBudgets).post("/", verifyToken, createBudget);

/**
 * Routes for a budget by id. Evalutes to `/budgets/:budgetId`.
 */
budgetRoutes
  .get("/:budgetId", verifyToken, getBudget)
  .put("/:budgetId", verifyToken, updateBudget)
  .delete("/:budgetId", verifyToken, deleteBudget);

module.exports = budgetRoutes;
