const express = require('express')

const router = express.Router();
const {signupUser, loginUser} = require('../controllers/authController');

router.post('/signUp', signupUser)
router.post('/login', loginUser)

module.exports = router