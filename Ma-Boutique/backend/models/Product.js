const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true, min: 0 },
    categorie: {
      type: String,
      enum: ["vetements", "chaussures", "bijoux", "parfums", "cereales", "decoration", "accessoires"],
      required: true,
    },
    image: { type: String, required: true },
    stock: { type: Number, default: 10, min: 0 },
    disponible: { type: Boolean, default: true },
    enVedette: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);