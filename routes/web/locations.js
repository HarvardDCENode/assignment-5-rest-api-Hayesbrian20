const express = require('express');
const router = express.Router();
const locationService = require('../../services/locationService');

router.get('/', async (req, res) => {
  try {
    const locations = await locationService.getAll();
    res.render('locations', { locations });
  } catch (err) {
    res.status(500).send('Error retrieving locations');
  }
});

router.get('/new', (req, res) => {
  res.render('add-location');
});

router.post('/', async (req, res) => {
  try {
  
    req.body.isActive = req.body.isActive === 'on';
    await locationService.create(req.body);
    res.redirect('/locations');
  } catch (err) {
    res.status(400).send('Error creating location');
  }
});


router.get('/:id/edit', async (req, res) => {
  try {
    const location = await locationService.getById(req.params.id);
    if (!location) return res.status(404).send('Location not found');
    res.render('add-location', { location });
  } catch (err) {
    res.status(500).send('Error fetching location');
  }
});


router.put('/:id', async (req, res) => {
  try {
    req.body.isActive = req.body.isActive === 'on';
    await locationService.update(req.params.id, req.body);
    res.redirect('/locations');
  } catch (err) {
    res.status(400).send('Error updating location');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await locationService.remove(req.params.id);
    res.redirect('/locations');
  } catch (err) {
    res.status(500).send('Error deleting location');
  }
});

module.exports = router;
