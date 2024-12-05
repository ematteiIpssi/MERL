import express from 'express';
import Ad from '../model/Ad.js'
import protect from '../authMiddleware.js'

const router = express.Router();

// Obtenir toutes les annonces
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find().populate('author', 'username email');
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch ads' });
    }
});

// Créer une annonce
router.post('/', protect, async (req, res) => {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const ad = new Ad({
            title,
            description,
            price,
            category,
            author: req.user.id, // Utilisateur connecté
        });

        const savedAd = await ad.save();
        res.status(201).json(savedAd);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create ad' });
    }
});

// Mettre à jour une annonce
router.put('/:id', protect, async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) return res.status(404).json({ message: 'Ad not found' });

        // Mise à jour des champs
        ad.title = title || ad.title;
        ad.description = description || ad.description;
        ad.price = price || ad.price;
        ad.category = category || ad.category;

        const updatedAd = await ad.save();
        res.json(updatedAd);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update ad' });
    }
});

// Supprimer une annonce
router.delete('/:id', protect, async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) return res.status(404).json({ message: 'Ad not found' });

        await ad.deleteOne();
        res.json({ message: 'Ad deleted' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete ad' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate('author', 'username email');
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.json(ad);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch ad details' });
    }
});

export default router;
