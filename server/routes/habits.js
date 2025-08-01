const express = require('express')
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit
} = require('../controllers/habitController');

router.get('/', protect, getHabits)
router.post('/', protect, createHabit);
router.put('/:id', protect, updateHabit);
router.delete('/:id', protect, deleteHabit);

module.exports = router;