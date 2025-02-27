const express = require("express");
const { check, validationResult } = require('express-validator');
const cors = require("cors");
const { openDb, initDb } = require("./database.js");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

const PORT = 3002;

initDb().then(() => {
    console.log("Database initialized successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("Database initialization failed:", err);
  });

// GET all cakes
app.get("/cakes", async (req, res) => {
  const db = await openDb();
  const cakes = await db.all("SELECT * FROM cakes");
  res.json(cakes);
});

const validator = [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Password should be at least 6 characters long'),
    check('comment')
      .exists()
      .isLength({ min: 5, max: 200})
      .withMessage('Comment should be at least 5 characters but max 200 characters long'),
    check('imageUrl')
      .not()
      .isEmpty()
      .withMessage('Image should not be empty'),
    check('yumFactor')
      .not()
      .isEmpty()
      .withMessage('Yum Factor should not be empty'),
  ];

// POST cakes
app.post("/cakes", validator, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, comment, imageUrl, yumFactor } = req.body;

  const db = await openDb();

  const cakeExist = await db.get('SELECT * FROM cakes WHERE name = ?', [name]);
  if (cakeExist) {
    res.status(400).json({ message: `Cake already exist with this name: '${name}'. Please choose a different name` });
  }
  try {
    await db.run(
      'INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?, ?, ?, ?)',
      [name, comment, imageUrl, yumFactor]
    );

    res.status(201).json({ message: 'Cake added successfully' });
  } catch (err) {
    console.error('Error inserting cake into database:', err);
    res.status(500).json({ message: 'Failed to add cake to the database' });
  }
  });