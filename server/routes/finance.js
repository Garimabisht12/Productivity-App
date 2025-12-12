const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome,
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/financeController');


// routes for income

router.get('/income/', protect, getIncome);
router.post('/income/', protect, createIncome);
router.put('/income/:id', protect, updateIncome);
router.delete('/income/:id', protect, deleteIncome);

router.get('/expense/', protect, getExpenses);
router.post('/expense/', protect, createExpense);
router.put('/expense/:id', protect, updateExpense);
router.delete('/expense/:id', protect, deleteExpense);

module.exports = router