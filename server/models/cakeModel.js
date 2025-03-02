const { openDb } = require("../database/database");

const getAllCakes = async () => {
  const db = await openDb();
  try {
    return await db.all("SELECT * FROM cakes");
  } catch (err) {
    console.error("Error fetching all cakes:", err);
    throw new Error("Failed to fetch all cakes");
  }
};

const getCakeById = async (id) => {
  const db = await openDb();
  try {
    const cake = await db.get("SELECT * FROM cakes WHERE id = ?", [id]);
    if (!cake) {
      throw new Error(`Cake with id ${id} not found`);
    }
    return cake;
  } catch (err) {
    console.error(`Error fetching cake with id ${id}:`, err);
    throw new Error(`Failed to fetch cake with id ${id}`);
  }
};

const createCake = async (name, comment, imageUrl, yumFactor) => {
  const db = await openDb();
  try {
    const existingCake = await db.get("SELECT * FROM cakes WHERE name = ?", [
      name,
    ]);
    if (existingCake) {
      throw new Error("Cake with this name already exists");
    }

    await db.run(
      "INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?, ?, ?, ?)",
      [name, comment, imageUrl, yumFactor]
    );
  } catch (err) {
    console.error("Error creating cake:", err);
    throw new Error("Failed to create cake");
  }
};

const deleteCakeById = async (id) => {
  const db = await openDb();
  try {
    const result = await db.run("DELETE FROM cakes WHERE id = ?", [id]);
    if (result.changes === 0) {
      throw new Error(`Cake with id ${id} not found or already deleted`);
    }
    return result;
  } catch (err) {
    console.error(`Error deleting cake with id ${id}:`, err);
    throw new Error("Failed to delete cake");
  }
};

const updateCakeById = async (id, name, comment, imageUrl, yumFactor) => {
  const db = await openDb();
  try {
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

    const query = `UPDATE cakes SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    values.push(id);

    const result = await db.run(query, values);
    if (result.changes === 0) {
      throw new Error(`Cake with id ${id} not found or no changes made`);
    }
    return result;
  } catch (err) {
    console.error(`Error updating cake with id ${id}:`, err);
    throw new Error("Failed to update cake");
  }
};

module.exports = {
  getAllCakes,
  getCakeById,
  createCake,
  deleteCakeById,
  updateCakeById,
};
