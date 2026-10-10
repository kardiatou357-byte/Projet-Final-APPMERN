import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

const titres = {
  vetements: "Vêtements",
  chaussures: "Chaussures",
  bijoux: "Bijoux",
  parfums: "Parfums & Encens",
  cereales: "Céréales & Épicerie",
  decoration: "Décoration",
  accessoires: "Accessoires",
};

const descriptions = {
  vetements: "Élégance et tradition réunies : pagnes, bazins riches, robes en dentelle et tissus wax soigneusement sélectionnés pour sublimer votre style.",
  chaussures: "Le confort sans compromis sur le style : mules, sandales et talons conçus pour vous accompagner du matin au soir.",
  bijoux: "L'éclat qui vous ressemble : colliers, bracelets et parures en perles, or et argent pour ajouter une touche précieuse à vos tenues.",
  parfums: "Une signature olfactive inoubliable : bakhoor, huiles parfumées et sprays aux senteurs d'Orient.",
  cereales: "Le goût authentique du terroir : mil, maïs, arachides et autres produits céréaliers soigneusement sélectionnés.",
  decoration: "Sublimez votre intérieur : coussins LED, stickers muraux 3D et accessoires décoratifs modernes.",
  accessoires: "Sacs, ceintures et accessoires tendance pour compléter votre look.",
};

export default function Categorie() {
  const { cat } = useParams();
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    setChargement(true);
    API.get(`/produits?categorie=${cat}`)
      .then((res) => setProduits(res.data))
      .finally(() => setChargement(false));
  }, [cat]);

  return (
    <div className="decorated-bg">
      <div className="container my-5 fade-in">
        <div className="categorie-header">
          <h1><i className="bi bi-tag-fill me-2"></i>{titres[cat] || cat}</h1>
          {descriptions[cat] && <p className="mt-3 mb-0">{descriptions[cat]}</p>}
        </div>

        {chargement ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
          </div>
        ) : produits.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            Aucun produit dans cette catégorie pour le moment.
          </div>
        ) : (
          <div className="row g-4">
            {produits.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                <ProductCard produit={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}