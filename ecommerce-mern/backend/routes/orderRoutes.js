const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/orders — Créer une commande
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, address } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      address,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/myorders — Mes commandes
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders — Toutes les commandes (admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;