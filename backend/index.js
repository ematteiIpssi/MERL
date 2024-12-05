import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import adRoutes from './routes/adRoutes.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Parse les requêtes JSON

// Connexion à MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Quitte le processus si la connexion échoue
    }
};

// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);

// Route par défaut (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
