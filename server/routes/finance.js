const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/financeController');


router.get('/', protect, getExpenses);
router.post('/', protect, createExpense);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router