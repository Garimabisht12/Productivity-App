import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateOrder
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.put("/order", protect, updateOrder);

export default router;

