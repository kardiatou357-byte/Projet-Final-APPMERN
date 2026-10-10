import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ produit }) {
  const { addToCart } = useCart();
  const fallback = "https://via.placeholder.com/300x300?text=Image+indisponible";

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <Link to={`/produit/${produit._id}`} style={{ overflow: "hidden", display: "block" }}>
        <img
          src={produit.image}
          alt={produit.nom}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
          onError={(e) => { e.target.src = fallback; }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <span className="badge-categorie align-self-start mb-2">{produit.categorie}</span>
        <h6 className="card-title fw-semibold">{produit.nom}</h6>
        <p className="card-text text-muted small flex-grow-1">
          {produit.description.substring(0, 70)}...
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.05rem" }}>
            {produit.prix.toLocaleString()} FCFA
          </span>
          <button className="btn btn-sm btn-primary" onClick={() => addToCart(produit)}>
            <i className="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}