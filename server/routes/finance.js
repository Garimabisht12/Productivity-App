import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from "../controllers/financeController.js";

const router = express.Router();

// Income routes
router.get("/income", protect, getIncome);
router.post("/income", protect, createIncome);
router.put("/income/:id", protect, updateIncome);
router.delete("/income/:id", protect, deleteIncome);

// Expense routes
router.get("/expenses", protect, getExpenses);
router.post("/expenses", protect, createExpense);
router.put("/expenses/:id", protect, updateExpense);
router.delete("/expenses/:id", protect, deleteExpense);

export default router;
