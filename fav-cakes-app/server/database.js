const sqlite3 = require('sqlite3').verbose();
const { open } = require("sqlite");

async function openDb() {
  return open({
    filename: "./cakes.sqlite",
    driver: sqlite3.Database,
  });
}

// Will create a table if it doesn't exist so can load some inital data
async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cakes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      comment TEXT NOT NULL CHECK(LENGTH(comment) BETWEEN 5 AND 200),
      imageUrl TEXT NOT NULL,
      yumFactor INTEGER NOT NULL CHECK(yumFactor BETWEEN 1 AND 5)
    )
  `);

  // Load some inital data to the database 
  const cakesTableExist = await db.get("SELECT COUNT(*) AS count FROM cakes");
  if (cakesTableExist.count === 0) {
    await db.exec(`
      INSERT INTO cakes (name, comment, imageUrl, yumFactor) 
      VALUES 
        ('Papanași', 'The best cake I ever had!', 'Had no time to take a photo', 5),
        ('Linzer', 'The best made by my granny.', 'Leave it for your imagination', 5),
        ('Marzipan Cake', 'Not a nice cake', 'Was not looking nice', 1)
    `);
    console.log("Initial cakes data inserted.");
  } else {
    console.log("Cake data already exists.");
  }
}



module.exports = { openDb, initDb }