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

const updateCakeById = async (id, name, comment, imageUrl, yumFactor) => {
    const db = await openDb();
  
    const fieldsToUpdate = [];
    const values = [];
  
    if (name) {
      fieldsToUpdate.push("name = ?");
      values.push(name);
    }
    if (comment) {
      fieldsToUpdate.push("comment = ?");
      values.push(comment);
    }
    if (imageUrl) {
      fieldsToUpdate.push("imageUrl = ?");
      values.push(imageUrl);
    }
    if (yumFactor) {
      fieldsToUpdate.push("yumFactor = ?");
      values.push(yumFactor);
    }
  
    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields to update");
    }
  
    const query = `UPDATE cakes SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    values.push(id);
  
    const result = await db.run(query, values);
    return result;
  };
  

module.exports = { getAllCakes, getCakeById, createCake, deleteCakeById, updateCakeById };
