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
app.get("/api/cakes", async (req, res) => {
  const db = await openDb();
  const cakes = await db.all("SELECT * FROM cakes");
  res.json(cakes);
});


// GET cake by id
app.get("/api/cakes/:id", async (req, res) => {
    try {
        const db = await openDb();
        const id = req.params.id
        const cake = await db.get("SELECT * FROM cakes WHERE id = ?", [id]);

        if (!cake) {
            return res.status(404).json({ error: "Cake not found" });
        }
        res.json(cake);
    } catch (error) {
        console.error("Error fetching cake:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  });

// DELETE cake by id
app.delete("/api/cakes/:id", async (req, res) => {
    try {
        const db = await openDb();
        const id = req.params.id
        const deleteResult = await db.run("DELETE FROM cakes WHERE id = ?", [id]);
        
        if (deleteResult.changes === 0) {
            return res.status(404).json({ error: "Cake not found" });
        }

        res.status(200).json({ message: "Cake deleted successfully" });
    } catch (error) {
        console.error("Error deleting cake:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
app.post("api/cakes", validator, async (req, res) => {
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