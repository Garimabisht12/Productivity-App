import { Income, Expense } from "../models/Finance.js";

// ----------------- Income Routes -----------------
export const getIncome = async (req, res) => {
  const incomes = await Income.find({ user: req.user });
  if (!incomes) return res.status(404).json({ message: "not found" });
  console.log('hit income');
  res.json(incomes);
};

export const createIncome = async (req, res) => {
  const { title, value } = req.body;
  const newIncome = new Income({ user: req.user, title, value });
  await newIncome.save();
  res.status(201).json(newIncome);
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, value } = req.body;
  const updatedIncome = await Income.findOneAndUpdate(
    { _id: id, user: req.user },
    { title, value },
    { new: true }
  );

  if (!updatedIncome)
    return res.status(404).json({ message: "income record not found" });

  await updatedIncome.save();
  res.json(updatedIncome);
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const deletedIncome = await Income.findOneAndDelete({ _id: id, user: req.user });

  if (!deletedIncome) return res.status(404).json({ message: "income not found" });
  res.json({ message: "deleted income" });
};

// ----------------- Expense Routes -----------------
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  if (!expenses) return res.status(404).json({ message: "not found" });
  console.log('hit expenses');
  res.json(expenses);
};

export const createExpense = async (req, res) => {
  const { title, value } = req.body;
  const newExp = new Expense({ user: req.user, title, value });
  await newExp.save();
  res.status(201).json(newExp);
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, value } = req.body;
  const updatedExp = await Expense.findOneAndUpdate(
    { _id: id, user: req.user },
    { title, value },
    { new: true }
  );

  if (!updatedExp)
    return res.status(404).json({ message: "expense record not found" });

  await updatedExp.save();
  res.json(updatedExp);
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const deletedExp = await Expense.findOneAndDelete({ _id: id, user: req.user });

  if (!deletedExp) return res.status(404).json({ message: "expense not found" });
  res.json({ message: "deleted expense" });
};
