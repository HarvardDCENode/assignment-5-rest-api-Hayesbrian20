const express = require('express');
const router = express.Router();
const menuService = require('../../services/menuService');

router.get('/', async (req, res) => {
  try {
    const menu = await menuService.getAll();
    res.render('menu', { menu });
  } catch (err) {
    res.status(500).send('Error retrieving menu items');
  }
});

router.get('/new', (req, res) => {
  res.render('add-menu');
});

router.post('/', async (req, res) => {
  try {
    await menuService.create(req.body);
    res.redirect('/menu');
  } catch (err) {
    res.status(400).send('Error creating menu item');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const menuItem = await menuService.getById(req.params.id);
    if (!menuItem) return res.status(404).send('Menu item not found');
    res.render('add-menu', { menuItem });
  } catch (err) {
    res.status(500).send('Error fetching menu item');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await menuService.update(req.params.id, req.body);
    res.redirect('/menu');
  } catch (err) {
    res.status(400).send('Error updating menu item');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await menuService.remove(req.params.id);
    res.redirect('/menu');
  } catch (err) {
    res.status(500).send('Error deleting menu item');
  }
});

module.exports = router;
