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

// incomme schema
const incomeSchema = mongoose.Schema({
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
const Income = mongoose.model('Income', incomeSchema)
const Expense = mongoose.model('Expense', expenseSchema)

module.exports = {Income, Expense};