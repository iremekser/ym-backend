const router = require('express').Router();

// controllers
const authController = require('../controllers/authController');


// validators
const validate = require('../controllers/middleware/validateRequest');

// routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
