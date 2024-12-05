import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import protect from '../authMiddleware.js'
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Vérification des champs requis
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Réponse en cas de succès
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
});
// Récupérer tous les utilisateurs
router.get('/', protect, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclure les mots de passe
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Créer un utilisateur (admin ou usage spécifique)
router.post('/', protect, async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Mettre à jour un utilisateur
router.put('/:id', protect, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mise à jour des champs
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Supprimer un utilisateur
router.delete('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclure le mot de passe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
});

export default router;
