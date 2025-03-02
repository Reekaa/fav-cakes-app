const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

const initDb = async () => {
  db = await open({
    filename: "./database/cakes.sqlite",
    driver: sqlite3.Database,
  });

  // Create the cakes table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cakes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      comment TEXT,
      imageUrl TEXT,
      yumFactor INTEGER
    );
  `);
};

const openDb = async () => {
  if (!db) {
    await initDb();
  }
  return db;
};

module.exports = { openDb, initDb };
