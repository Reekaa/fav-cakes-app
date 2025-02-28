const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {
  db = await open({
    filename: './cakes.sqlite',
    driver: sqlite3.Database,
  });
};

const openDb = async () => {
  if (!db) {
    await initDb();
  }
  return db;
};

module.exports = { openDb, initDb };
