import { getBudgets, getBudget, createBudget, updateBudget, deleteBudget } from "../controllers/budget.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { Router } from "express";

const budgetRoutes = Router();
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

export default budgetRoutes;
