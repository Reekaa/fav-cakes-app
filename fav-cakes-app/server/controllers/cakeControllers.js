const { validationResult } = require('express-validator');
const { getAllCakes, getCakeById, createCake, deleteCakeById, updateCakeById } = require('../models/cakeModel');

// Get all cakes
const getCakes = async (req, res) => {
  try {
    const cakes = await getAllCakes();
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
    if (err.message === 'Cake with this name already exists') {
      return res.status(409).json({ error: 'Cake with this name already exists' });
    }
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

// Update cake by ID
const updateCake = async (req, res) => {
  const { id } = req.params;
  const { name, comment, imageUrl, yumFactor } = req.body;

  if (!name && !comment && !imageUrl && !yumFactor) {
    return res.status(400).json({ error: "At least one field is required to update the cake" });
  }

  try {
    const result = await updateCakeById(id, name, comment, imageUrl, yumFactor);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Cake not found" });
    }

    res.json({ message: "Cake updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error on update" });
  }
};

module.exports = { getCakes, getCake, addCake, removeCake, updateCake };
