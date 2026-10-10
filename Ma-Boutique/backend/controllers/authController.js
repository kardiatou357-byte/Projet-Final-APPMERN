const User = require("../models/User");
const jwt = require("jsonwebtoken");

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    if (!nom || !email || !password)
      return res.status(400).json({ message: "Champs requis manquants" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email déjà utilisé" });

    const user = await User.create({ nom, email, password });
    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token: genToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Identifiants invalides" });

    res.json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token: genToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.profile = async (req, res) => {
  res.json(req.user);
};