import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Cart() {
  const { items, removeFromCart, updateQte, totalPrix, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <div className="container text-center my-5 fade-in">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <h3 className="mt-3">Votre panier est vide</h3>
        <Link to="/" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>Continuer mes achats
        </Link>
      </div>
    );

  return (
    <div className="container my-5 fade-in decorated-bg">
      <h2 className="section-title mb-4">
        <i className="bi bi-cart3 text-primary me-2"></i>Mon Panier
      </h2>
      <div className="row g-4">
        <div className="col-lg-8">
          {items.map((i) => (
            <div className="card mb-3 shadow-sm border-0 cart-item" key={i._id}>
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <img
                    src={i.image}
                    alt={i.nom}
                    style={{ height: "120px", width: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/200x200"; }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <h6 className="fw-semibold mb-1">{i.nom}</h6>
                      <p className="text-muted small mb-1">{i.categorie}</p>
                      <span className="fw-bold" style={{ color: "var(--primary)" }}>
                        {i.prix.toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={i.quantite}
                        onChange={(e) => updateQte(i._id, Number(e.target.value))}
                        className="form-control form-control-sm"
                        style={{ width: "70px" }}
                      />
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          removeFromCart(i._id);
                          toast.info("Produit retiré du panier");
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-3">
            <h4>Résumé</h4>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>Total</span>
              <span className="fw-bold" style={{ color: "var(--primary)" }}>
                {totalPrix.toLocaleString()} FCFA
              </span>
            </div>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => (user ? navigate("/checkout") : navigate("/login"))}
            >
              <i className="bi bi-credit-card me-2"></i>Passer commande
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                clearCart();
                toast.info("Panier vidé");
              }}
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}