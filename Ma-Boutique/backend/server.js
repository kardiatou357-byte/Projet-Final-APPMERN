const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/produits", require("./routes/productRoutes"));
app.use("/api/commandes", require("./routes/orderRoutes"));

app.get("/", (req, res) => res.json({ message: "API Sopenabi-Boutique ✅" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));