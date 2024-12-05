import express from 'express';
import Category from '../models/Category';

const router = express.Router();

// Obtenir toutes les catégories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
});

export default router;
