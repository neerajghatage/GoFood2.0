// app.js
require('dotenv').config();
const express = require('express');
const connect = require("./db/connect");
const cors = require('cors');
require('./middleware/cache_middleware'); 
const app = express();

connect();
app.use(cors({
  origin: 'https://symmetrical-palm-tree-4pxq756wp7j27jqj-3000.app.github.dev'
  // credentials: true // Only if using cookies or auth headers
}));

const foodItemRoutes = require('./Routes/foodItemRoutes');
const OrderDataRoutes = require('./Routes/orderDataRoutes');
const CreateUserRoutes = require('./Routes/createUserRoutes');
const DisplayDataRoutes = require('./Routes/displayDataRoutes');
const adminUserRoutes = require('./Routes/adminUserRoutes');

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(express.json());
app.use('/api', OrderDataRoutes);
app.use('/api', CreateUserRoutes);
app.use('/api', DisplayDataRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api', adminUserRoutes);

module.exports = app;
