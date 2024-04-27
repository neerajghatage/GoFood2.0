
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxlength: [100, 'Category name should not exceed 100 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name should not exceed 100 characters']
    },
    img: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true,
        validate: {
            validator: function (v) {

                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL for image!`
        }
    },
    options: [{
        half: {
            type: String,
            required: [true, 'Half option price is required'],
            trim: true
        },
        full: {
            type: String,
            required: [true, 'Full option price is required'],
            trim: true
        }
    }],
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description should be at least 10 characters long'],
        maxlength: [1000, 'Description should not exceed 1000 characters']
    }
}, {

    collection: 'food_items'
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
