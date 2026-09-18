const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Servir la raíz del proyecto (para index.html)
app.use(express.static(path.join(__dirname, '../')));

// Rutas de la API
app.use('/api', userRoutes);

// Entregar index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;