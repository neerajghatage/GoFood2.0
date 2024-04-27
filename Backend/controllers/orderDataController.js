const Order = require('../models/Order');

exports.postOrderData = async (req, res) => {
    try {
        let data = req.body.order_data;
        await data.splice(0, 0, { Order_date: req.body.order_date });

        let existingOrder = await Order.findOne({ 'email': req.body.email });
        
        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyOrderData = async (req, res) => {
    try {
        let existingOrder = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: existingOrder });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};