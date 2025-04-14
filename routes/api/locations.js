const express = require('express');
const router = express.Router();
const locationService = require('../../services/locationService');
const Location = require('../../models/Location'); 

router.get('/', async (req, res) => {
  const locations = await locationService.getAll();
  res.json(locations);
});

router.get('/:id', async (req, res) => {
  const location = await locationService.getById(req.params.id);
  if (!location) return res.status(404).json({ error: 'Location not found' });
  res.json(location);
});

router.post('/', async (req, res) => {
    console.log('POST /api/locations body:', req.body);
  
    try {
      const newLocation = await locationService.create(req.body);
      res.status(201).json(newLocation);
    } catch (err) {
      console.error('CREATE ERROR:', err); 
      res.status(400).json({
        error: 'Invalid data',
        message: err.message,
        stack: err.stack
      });
    }
  });
  
router.put('/:id', async (req, res) => {
  try {
    const updated = await locationService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Location not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await locationService.remove(req.params.id);
  res.status(204).end();
});

module.exports = router;
