const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/products — Liste tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ⚠️ ROUTE TEMPORAIRE — Créer des produits de test
// Placer impérativement avant router.get('/:id')
// Ouvrir : http://localhost:5000/api/products/seed/data
router.get('/seed/data', async (req, res) => {
    try {
        await Product.deleteMany({});
        const products = await Product.insertMany([
            {
                name: 'T-shirt Premium',
                description: '100% coton bio, coupe moderne et confortable',
                price: 25,
                image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
                category: 'Vêtements',
                stock: 10,
            },
            {
                name: 'Casque Bluetooth',
                description: 'Son haute qualité, autonomie 30h, réduction de bruit',
                price: 89,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
                category: 'Électronique',
                stock: 5,
            },
            {
                name: 'Montre connectée',
                description: 'Suivi sportif, notifications, GPS intégré',
                price: 149,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
                category: 'Électronique',
                stock: 8,
            },
            {
                name: 'Sac à dos urbain',
                description: 'Compartiment laptop 15 pouces, imperméable',
                price: 59,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
                category: 'Accessoires',
                stock: 12,
            },
            {
                name: 'Sneakers Running',
                description: 'Amorti optimal, légères et respirantes',
                price: 79,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
                category: 'Chaussures',
                stock: 15,
            },
            {
                name: 'Lunettes de soleil',
                description: 'Protection UV400, monture légère',
                price: 45,
                image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
                category: 'Accessoires',
                stock: 20,
            },
        ]);
        res.json({ message: `✅ ${products.length} produits créés`, products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/products/:id — Détail d'un produit
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) res.json(product);
        else res.status(404).json({ message: 'Produit introuvable' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/products — Créer (admin)
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/products/:id — Modifier (admin)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/products/:id — Supprimer (admin)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;