const { openDb } = require("../database/database");

const getAllCakes = async () => {
  const db = await openDb();
  return db.all("SELECT * FROM cakes");
};

const getCakeById = async (id) => {
  const db = await openDb();
  return db.get("SELECT * FROM cakes WHERE id = ?", [id]);
};

const createCake = async (name, comment, imageUrl, yumFactor) => {
  const db = await openDb();
  await db.run(
    'INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?, ?, ?, ?)',
    [name, comment, imageUrl, yumFactor]
  );
};

const deleteCakeById = async (id) => {
  const db = await openDb();
  const result = await db.run("DELETE FROM cakes WHERE id = ?", [id]);
  return result;
};

module.exports = { getAllCakes, getCakeById, createCake, deleteCakeById };
