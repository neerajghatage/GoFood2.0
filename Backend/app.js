// app.js
require('dotenv').config();
const express = require('express');
const connect = require("./db/connect");
const cors = require('cors');
const app = express();

connect();
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin only
}));
app.options('/api/loginuser', cors()); // Handle OPTIONS request for /api/loginuser route
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
