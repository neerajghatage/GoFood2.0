
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AdminUser = require('../models/AdminUser');

const jwtSecret = process.env.JWT_SECRET;

exports.loginAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const adminUser = await AdminUser.findOne({ email });

        if (!adminUser) {
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        const isMatch = (password === adminUser.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        const payload = {
            adminUser: {
                id: adminUser.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};
