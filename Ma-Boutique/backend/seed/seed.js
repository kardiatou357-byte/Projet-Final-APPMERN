require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");

const produits = [
  { nom: "Bazin Riche", description: "Tissu bazin riche de qualité supérieure, motif damier doré. Idéal pour les grandes occasions.", prix: 45000, categorie: "vetements", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5OBjmc_DoqozyASYY1OXI3k1dBLKRyHJFvFiWrYzO7Q&s=10", stock: 15, enVedette: true },
  { nom: "Robe Dentelle à Manches Plumes", description: "Robe longue en dentelle blanche avec manches en plumes. Élégance et sophistication garanties.", prix: 85000, categorie: "vetements", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_gOqUaP-k4n-oLuLDYqE-KsWIjBB2chxn6a5vMlIGkw&s", stock: 5, enVedette: true },
  { nom: "Pagne Wax Multicolore", description: "Pagne traditionnel aux motifs géométriques multicolores. 100% coton, tissage artisanal.", prix: 12000, categorie: "vetements", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXEYuXqEiYmvBq5g_6EDr6xCDg5XMnmNTe-Q7EgpUVw&s=10", stock: 30 },
  { nom: "Chaussures", description: "Mules à talon carré, disponibles en noir, beige, blanc et rouge. Confort et style réunis.", prix: 25000, categorie: "chaussures", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VS0cdSm_fYfv8Uw50bjeyAmPc3mKLXST7bU9Y8i-xQ&s=10", stock: 20, enVedette: true },
  { nom: "Sac à Main pour femme", description: "Sac à main en cuir synthétique haut de gamme, 5 coloris disponibles. Élégant et pratique.", prix: 35000, categorie: "accessoires", image: "https://www.soumari.com/wp-content/uploads/2023/12/Sac-a-Main-pour-Femme-S1.jpg", stock: 12 },
  { nom: "Encens Bakhoor Al Badar", description: "Encens de luxe aux senteurs orientales. Parfum durable pour la maison et les vêtements.", prix: 5000, categorie: "parfums", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", stock: 50 },
  { nom: "Spray Parfumé d'Ambiance", description: "Lot de sprays parfumés aux fragrances variées (Silca, Mayar, Burhan, Ghalib...).", prix: 8000, categorie: "parfums", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80", stock: 25 },
  { nom: "Or pur 18 carats", description: "Un bijou en or pour femme est un accessoire intemporel, élégant et résistant qui symbolise la richesse, l'excellence ou l'éternité.", prix: 150000, categorie: "bijoux", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CcP--gyAvyPOQ1T_rgSMzJ0XctfYX7eMAL54oO2LYQ&s", stock: 10 },
  { nom: "Coussin LED Lumineux 'Kiss'", description: "Coussin décoratif en forme de cœur avec LED multicolores. Parfait pour cadeaux.", prix: 12000, categorie: "decoration", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGWJPHifKqcJcvDFcvnKd4AKJmRKQIypo8gYkis6Wzog&s", stock: 8 },
  { nom: "Meulfeu", description: "Un voile souple, fin et agréable à porter, souvent aux couleurs chatoyantes ou aux motifs délicats.", prix: 5000, categorie: "vetements", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86msUtdbalBc4w7I6g15nXgkwK8r9NmGFcLBBjM2rGA&s=10", stock: 40 },
  { nom: "Céréales", description: "Les principales céréales cultivées et consommées au Sénégal sont le mil, le maïs, le sorgho, le riz et le fonio, qui constituent la base de l'alimentation nationale", prix: 3500, categorie:"cereales", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzWXQtRmChqpJpBTWPOSBu3vM_emxbGm9B8ECIWHOcg&s=10", stock: 70 },

];

const seed = async () => {
  await connectDB();
  try {
    await Product.deleteMany();
    await Product.insertMany(produits);
    console.log("✅ Produits insérés :", produits.length);

    if (!(await User.findOne({ email: "admin@sopenabi.com" }))) {
      await User.create({
        nom: "Admin",
        email: "admin@sopenabi.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin créé : admin@sopenabi.com / admin123");
    } else {
      console.log("ℹ️  Admin déjà existant");
    }
    process.exit(0);
  } catch (e) {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  }
};

seed();