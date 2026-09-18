const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Solo manejamos las rutas de la API
app.use('/api', userRoutes);

module.exports = app;