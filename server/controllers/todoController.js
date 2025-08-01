const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

exports.createTodo = async(req, res) =>{
    const { title, is_completed, deadline } = req.body;
      const todo = new Todo({ user: req.user, title, is_completed, deadline });
      await todo.save();
      res.status(201).json(todo);
}

exports.updateTodo = async(req, res) =>{
    const {id} = req.params;
    const { title, is_completed, deadline } = req.body;
    const todo = await Todo.findOneAndUpdate({_id: id, user: req.user}, {title, is_completed, deadline})
   
if (!todo) return res.status(404).json({ message: 'todo not found' });
  res.json(todo);

}

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user });
  if (!deleted) return res.status(404).json({ message: 'todo not found' });
  res.json({ message: 'todo deleted' });
};

