const Product = require("../models/Product");

exports.getAll = async (req, res) => {
  try {
    const { categorie, q } = req.query;
    const filtre = {};
    if (categorie) filtre.categorie = categorie;
    if (q) filtre.nom = { $regex: q, $options: "i" };
    const produits = await Product.find(filtre).sort({ createdAt: -1 });
    res.json(produits);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Produit introuvable" });
    res.json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};