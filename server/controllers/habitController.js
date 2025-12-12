import Habit from "../models/Habits.js";
import { calculateStreaks } from "../utils/streakUtils.js";

// ----------------- Habit Routes -----------------
export const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user });

  const habitsWithStreaks = habits.map((habit) => {
    const { currentStreak, longestStreak } = calculateStreaks(habit.entries || []);
    return { ...habit.toObject(), currentStreak, longestStreak };
  });

  res.json(habitsWithStreaks);
};

export const createHabit = async (req, res) => {
  const { title, type, entries } = req.body;
  const habit = new Habit({ user: req.user, title, type, entries: entries || [] });
  await habit.save();

  const { currentStreak, longestStreak } = calculateStreaks(habit.entries);

  res.status(201).json({
    ...habit.toObject(),
    currentStreak,
    longestStreak,
  });
};

export const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { title, type, entries } = req.body;

  const habit = await Habit.findOneAndUpdate(
    { _id: id, user: req.user },
    { title, type, entries },
    { new: true }
  );

  if (!habit) return res.status(404).json({ message: "habit not found" });

  const { currentStreak, longestStreak } = calculateStreaks(habit.entries);

  res.json({
    ...habit.toObject(),
    currentStreak,
    longestStreak,
  });
};

export const deleteHabit = async (req, res) => {
  const { id } = req.params;
  const deleted = await Habit.findOneAndDelete({ _id: id, user: req.user });
  if (!deleted) return res.status(404).json({ message: "Habit not found" });
  res.json({ message: "habit deleted" });
};
