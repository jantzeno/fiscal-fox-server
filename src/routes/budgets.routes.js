const {
  getAllBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budget.controller.js");
const { verifyToken } = require("../middleware/authJwt.middleware");
const express = require("express");
const { verify } = require("jsonwebtoken");

const budgetRoutes = express.Router();
/**
 * Routes for all budgets. Evaluates to `/budgets/`.
 */
budgetRoutes.get("/", verifyToken, getAllBudgets).post("/", createBudget);

/**
 * Routes for a budget by id. Evalutes to `/budget/:budgetId`.
 */
budgetRoutes
  .get("/:budgetId", verifyToken, getBudget)
  .put("/:budgetId", updateBudget)
  .delete("/:budgetId", deleteBudget);

module.exports = budgetRoutes;
