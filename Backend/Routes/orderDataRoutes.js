const express = require('express');
const orderDataController = require('../controllers/orderDataController');

const router = express.Router();

router.post('/orderData', orderDataController.postOrderData);
router.post('/myOrderData', orderDataController.getMyOrderData);
router.post('/allOrders', orderDataController.getAllOrders);
module.exports = router;