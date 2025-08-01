const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Expense', expenseSchema)