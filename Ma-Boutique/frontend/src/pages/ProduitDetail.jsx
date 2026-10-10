import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProduitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [produit, setProduit] = useState(null);
  const [qte, setQte] = useState(1);

  useEffect(() => {
    API.get(`/produits/${id}`).then((res) => setProduit(res.data));
  }, [id]);

  if (!produit) return <div className="text-center py-5">Chargement...</div>;

  const fallback = "https://via.placeholder.com/600x600?text=Image+indisponible";

  const handleAdd = () => {
    for (let i = 0; i < qte; i++) addToCart(produit);
    navigate("/panier");
  };

  return (
    <div className="container my-5 fade-in decorated-bg">
      <div className="row g-5">
        <div className="col-md-6">
          <img
            src={produit.image}
            alt={produit.nom}
            className="img-fluid rounded-4 shadow-sm"
            onError={(e) => { e.target.src = fallback; }}
          />
        </div>
        <div className="col-md-6">
          <span className="badge-categorie">{produit.categorie}</span>
          <h1 className="mt-3">{produit.nom}</h1>
          <p className="display-6 fw-bold" style={{ color: "var(--primary)" }}>
            {produit.prix.toLocaleString()} FCFA
          </p>
          <p className="text-muted">{produit.description}</p>

          <div className="d-flex align-items-center gap-3 my-4">
            <label className="fw-semibold">Quantité :</label>
            <input
              type="number"
              min="1"
              value={qte}
              onChange={(e) => setQte(Number(e.target.value))}
              className="form-control"
              style={{ width: "90px" }}
            />
            <span className="text-muted small">
              {produit.stock > 0 ? `${produit.stock} en stock` : "Rupture"}
            </span>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleAdd}
            disabled={produit.stock === 0}
          >
            <i className="bi bi-cart-plus me-2"></i>Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}