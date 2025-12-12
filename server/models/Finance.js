import mongoose from "mongoose";

// Expense schema
const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

// Income schema
const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

export const Income = mongoose.model("Income", incomeSchema);
export const Expense = mongoose.model("Expense", expenseSchema);
