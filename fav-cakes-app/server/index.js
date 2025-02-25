const express = require("express");
const cors = require("cors");
const { openDb, initDb } = require("./database.js");

const app = express();
app.use(cors());
app.use(express.json());

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
  console.log('cakes', cakes);
  res.json(cakes);
});