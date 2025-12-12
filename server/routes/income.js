// routes for income
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome
} = require('../controllers/financeController');


router.get('/', protect, getIncome);
router.post('/', protect, createIncome);
router.put('/:id', protect, updateIncome);
router.delete('/:id', protect, deleteIncome);


module.exports = router