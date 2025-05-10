// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            name,
            email,
            password: hashedPassword,
            location
        });

        res.json({ success: true });
    } catch (error) {
        console.error(53353535);
        console.error(error);
        res.json({ success: false });
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};


exports.getLocation = async (req, res) => {
    try {
        const { latlong } = req.body;
        const lat = latlong.lat;
        const long = latlong.long;

        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`);
        
        const { components } = response.data.results[0];
        const { village, county, state_district, state, postcode } = components;
        const locationString = `${village}, ${county}, ${state_district}, ${state}, \n${postcode}`;

        res.send({ location: locationString });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};