const mongoose = require('mongoose');

exports.getFoodData = async (req, res) => {
  try {
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    res.send([foodItems, foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
