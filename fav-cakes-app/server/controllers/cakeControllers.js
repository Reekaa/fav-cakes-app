const { validationResult } = require('express-validator');
const { getAllCakes, getCakeById, createCake, deleteCakeById } = require('../models/cakeModel');

// Get all cakes
const getCakes = async (req, res) => {
  try {
    const cakes = await getAllCakes();
    console.log('-----cakes', cakes);
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cakes' });
  }
};

// Get cake by ID
const getCake = async (req, res) => {
  const { id } = req.params;
  try {
    const cake = await getCakeById(id);
    if (!cake) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json(cake);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cake details' });
  }
};

// Create a new cake
const addCake = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, comment, imageUrl, yumFactor } = req.body;
  try {
    await createCake(name, comment, imageUrl, yumFactor);
    res.status(201).json({ message: 'Cake added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add cake' });
  }
};

// Delete cake by ID
const removeCake = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCakeById(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Cake not found' });
    }
    res.status(200).json({ message: 'Cake deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cake' });
  }
};

module.exports = { getCakes, getCake, addCake, removeCake };
