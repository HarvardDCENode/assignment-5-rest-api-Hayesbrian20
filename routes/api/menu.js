const express = require('express');
const router = express.Router();
const menuService = require('../../services/menuService');
const MenuItem = require('../../models/MenuItem');


router.get('/', async (req, res) => {
  const menu = await menuService.getAll();
  res.json(menu);
});

router.get('/:id', async (req, res) => {
  const item = await menuService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const newItem = await menuService.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await menuService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Menu item not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await menuService.remove(req.params.id);
  res.status(204).end();
});

module.exports = router;
