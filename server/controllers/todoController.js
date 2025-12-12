import Todo from "../models/Todo.js";

// ----------------- Todo Routes -----------------
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }).sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { todos } = req.body; // array of todo IDs in new order

    // update each todo with its new order index
    await Promise.all(
      todos.map((id, index) => Todo.findByIdAndUpdate(id, { order: index }))
    );

    res.json({ success: true, message: "Order updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to reorder todos" });
  }
};

export const createTodo = async (req, res) => {
  const { title, is_completed, deadline, order } = req.body;
  const todo = new Todo({ user: req.user, title, is_completed, deadline, order });
  await todo.save();
  res.status(201).json(todo);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, is_completed, deadline, order } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user },
    { title, is_completed, deadline, order },
    { new: true }
  );

  if (!todo) return res.status(404).json({ message: "todo not found" });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user });
  if (!deleted) return res.status(404).json({ message: "todo not found" });
  res.json({ message: "todo deleted" });
};
