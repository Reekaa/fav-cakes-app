const app = require('./app');
const { initDb } = require('./database/database');

const PORT = 3002;

initDb().then(() => {
  console.log('Database initialized');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Database initialization failed:', err);
});

