const express = require('express');
const cors = require('cors');
const cakeRoutes = require('./routes/cakeRoutes');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use('/api', cakeRoutes);

module.exports = app;
