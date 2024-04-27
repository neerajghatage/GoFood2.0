// routes/createUserRoute.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for creating a new user
router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], userController.createUser);

// Route for logging in a user
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], userController.loginUser);

// Route for getting location
router.post('/getlocation', userController.getLocation);

module.exports = router;