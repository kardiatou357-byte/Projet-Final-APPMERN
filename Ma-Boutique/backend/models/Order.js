const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        nom: String,
        prix: Number,
        quantite: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    adresse: {
      rue: String,
      ville: String,
      pays: String,
      telephone: String,
    },
    statut: {
      type: String,
      enum: ["en_attente", "confirmee", "expediee", "livree", "annulee"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);