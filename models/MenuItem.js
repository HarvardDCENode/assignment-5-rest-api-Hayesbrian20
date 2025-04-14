const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    description: String,
    price: { type: Number, required: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);


