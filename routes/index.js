const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
    const locations = await Location.find({ isActive: true });
    const menu = await MenuItem.find();
    res.render('index', { locations, menu });
});

module.exports = router;

