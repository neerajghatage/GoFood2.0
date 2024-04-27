// routes/foodDataRoute.js
const express = require('express');
const foodDataController = require('../controllers/foodDataController');

const router = express.Router();

router.post('/foodData', foodDataController.getFoodData);

module.exports = router;
