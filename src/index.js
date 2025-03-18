'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuario.routes.js');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/prueba_backend', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

const app = express();

// Middleware
app.use((req, res, next) => {
    req.url = decodeURIComponent(req.url);
    next();
});
app.use(cors());
app.use(express.json());
app.use('/usuarios', usuarioRoutes);

// Iniciar la aplicación después de la conexión exitosa
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
}).catch(error => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
});

module.exports = { app, connectDB };