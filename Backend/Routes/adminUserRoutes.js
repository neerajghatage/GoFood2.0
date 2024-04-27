
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const adminController = require('../controllers/adminUserController');

// POST route for admin sign-in
router.post(
    '/loginadmin',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').notEmpty()
    ],
    adminController.loginAdmin
);

module.exports = router;