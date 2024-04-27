const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL ;

const connect = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the MongoDB database");

    const dataa = mongoose.connection.db.collection("food_items");
    const data = await dataa.find({}).toArray();
    global.food_items = data;

    const cdataa = mongoose.connection.db.collection("food_category");
    const cdata = await cdataa.find({}).toArray();
    global.foodCategory = cdata;

  } catch (error) {
    console.error("Error:", error);
  }
};


module.exports = connect;