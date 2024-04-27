
const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/',upload.array('files'), foodItemController.createFoodItem);
router.get('/', foodItemController.getFoodItems);
router.get('/:id', foodItemController.getFoodItem);
router.patch('/:id', foodItemController.updateFoodItem);
router.delete('/:id', foodItemController.deleteFoodItem);
router.get('/by-name/:name', foodItemController.getFoodItemByName);
router.get('/by-category/:categoryName', foodItemController.getFoodItemByCategoryName);
router.delete('/by-name/:name', foodItemController.deleteFoodItemByName);
router.patch('/by-name/:name', foodItemController.updateFoodItemByName);

module.exports = router;
