import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    is_completed: {
        type: Boolean,
        required: true,
    },
    deadline:{
        type: String
    },
    order:{
        type: Number
    }
})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo;