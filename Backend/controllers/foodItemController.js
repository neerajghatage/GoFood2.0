// controllers/foodItemController.js
const FoodItem = require('../models/FoodItem');
const { addImage } = require("../utils/awsS3upload");

exports.createFoodItem = async (req, res) => {
    try {
        const {CategoryName, name, half, full, description} = req.body;
        console.log(req.files);
        let options = {
            half,
            full
        }
        const imgreq = req.files[0];
        let imglink = null;
        if (imgreq) {
            console.log(" img exists");
            if (imgreq.size > 5 * 1024 * 1024) {
                return res
                  .status(400)
                  .send({ message: "File size too large, max 5MB allowed" });
              }

              imglink = await addImage(imgreq);
        console.log("camlink returned ",imglink);
        }
        let img = imglink;
        const newFoodItem = new FoodItem({CategoryName, name, img, options, description});
       
        const foodItem =  await newFoodItem.save();
        res.status(201).send(foodItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).send();
        }
        res.send(foodItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateFoodItem = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).send();
        }
        updates.forEach((update) => foodItem[update] = req.body[update]);
        await foodItem.save();
        res.send(foodItem);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!foodItem) {
            return res.status(404).send();
        }
        res.send(foodItem);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getFoodItemByName = async (req, res) => {
    try {
        console.log(global.food_items);
        const foodItem = await FoodItem.findOne({ name: req.params.name });
        if (!foodItem) {
            return res.status(404).send('Food item not found');
        }
        res.send(foodItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getFoodItemByCategoryName = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ categoryName: req.params.categoryName });
        if (foodItems.length === 0) {
            return res.status(404).send('No food items found in this category');
        }
        res.send(foodItems);
    } catch (error) {
        res.status(500).send(error);
    }
};



exports.deleteFoodItemByName = async (req, res) => {
    try {
        const deletedItem = await FoodItem.findOneAndDelete({ name: req.params.name });
        if (!deletedItem) {
            return res.status(404).send('Food item not found');
        }
        res.send(deletedItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateFoodItemByName = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const updatedItem = await FoodItem.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).send('Food item not found');
        }
        res.send(updatedItem);
    } catch (error) {
        res.status(400).send(error);
    }
};