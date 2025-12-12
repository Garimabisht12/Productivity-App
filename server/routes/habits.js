import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/", protect, getHabits);
router.post("/", protect, createHabit);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);

export default router;
