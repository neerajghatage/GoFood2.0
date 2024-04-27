
exports.getFoodData = (req, res) => {
    try {
        console.log(global.food_items);
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
