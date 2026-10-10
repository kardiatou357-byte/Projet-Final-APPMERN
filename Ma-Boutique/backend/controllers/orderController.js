const Order = require("../models/Order");

exports.create = async (req, res) => {
  try {
    const { items, total, adresse } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      adresse,
    });
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getMine = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

exports.getAll = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "nom email")
    .sort({ createdAt: -1 });
  res.json(orders);
};

exports.updateStatut = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { statut: req.body.statut },
    { new: true }
  );
  res.json(order);
};