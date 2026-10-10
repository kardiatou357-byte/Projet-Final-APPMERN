import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const methodes = [
  { key: "wave", nom: "Wave", icone: "bi-phone", couleur: "#1dc4ff" },
  { key: "orange", nom: "Orange Money", icone: "bi-phone-fill", couleur: "#ff7900" },
  { key: "livraison", nom: "Paiement à la livraison", icone: "bi-cash-coin", couleur: "#10b981" },
];

export default function Checkout() {
  const { items, totalPrix, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [adresse, setAdresse] = useState({ rue: "", ville: "", pays: "Sénégal", telephone: "" });
  const [methode, setMethode] = useState("wave");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/commandes", {
        items,
        total: totalPrix,
        adresse,
        methodePaiement: methode,
      });

      // Simulation paiement mobile
      if (methode === "wave" || methode === "orange") {
        toast.info(`📲 Simulation paiement ${methode === "wave" ? "Wave" : "Orange Money"}...`);
        await new Promise((r) => setTimeout(r, 1500));
      }

      clearCart();
      toast.success("✅ Commande passée avec succès !");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Erreur : " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 fade-in" style={{ maxWidth: "750px" }}>
      <h2 className="section-title mb-4">
        <i className="bi bi-truck text-primary me-2"></i>Finaliser la commande
      </h2>

      <form className="card shadow-sm border-0 p-4" onSubmit={handleSubmit}>
        {/* Adresse */}
        <h5 className="mb-3">
          <i className="bi bi-geo-alt text-primary me-2"></i>Adresse de livraison
        </h5>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label">Rue</label>
            <input className="form-control" value={adresse.rue}
              onChange={(e) => setAdresse({ ...adresse, rue: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Ville</label>
            <input className="form-control" value={adresse.ville}
              onChange={(e) => setAdresse({ ...adresse, ville: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Pays</label>
            <input className="form-control" value={adresse.pays}
              onChange={(e) => setAdresse({ ...adresse, pays: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Téléphone</label>
            <input className="form-control" value={adresse.telephone}
              onChange={(e) => setAdresse({ ...adresse, telephone: e.target.value })} required />
          </div>
        </div>

        {/* Paiement */}
        <h5 className="mb-3">
          <i className="bi bi-credit-card text-primary me-2"></i>Méthode de paiement
        </h5>
        <div className="row g-3 mb-4">
          {methodes.map((m) => (
            <div className="col-md-4" key={m.key}>
              <div
                className={`paiement-card ${methode === m.key ? "active" : ""}`}
                onClick={() => setMethode(m.key)}
                style={{ borderColor: methode === m.key ? m.couleur : undefined }}
              >
                <i className={`bi ${m.icone} fs-2`} style={{ color: m.couleur }}></i>
                <p className="mt-2 mb-0 fw-semibold small">{m.nom}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>Total à payer</span>
          <strong className="fs-5">{totalPrix.toLocaleString()} FCFA</strong>
        </div>

        <button className="btn btn-success btn-lg" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Traitement...
            </>
          ) : (
            <>
              <i className="bi bi-shield-check me-2"></i>Confirmer la commande
            </>
          )}
        </button>
      </form>
    </div>
  );
}