const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
    hours: { type: String }
});

module.exports = mongoose.model('Location', locationSchema);

