const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// 1. Servir archivos estáticos (index.html, main.js, etc.) desde la raíz del proyecto
app.use(express.static(path.join(__dirname, '../')));

// 2. Rutas de la API
app.use('/api', userRoutes);

// 3. Ruta principal para enviar index.html explícitamente cuando entren a http://localhost:3000/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;