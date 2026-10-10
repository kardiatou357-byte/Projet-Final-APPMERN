import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    API.get("/commandes/mine").then((res) => setCommandes(res.data));
  }, []);

  return (
    <div className="container my-5 fade-in decorated-bg">
      <h2 className="section-title mb-4">
        <i className="bi bi-person-circle text-primary me-2"></i>Bonjour, {user?.nom}
      </h2>
      <h4 className="mt-4">Mes commandes</h4>
      {commandes.length === 0 ? (
        <p className="text-muted">Aucune commande passée pour le moment.</p>
      ) : (
        commandes.map((c) => (
          <div className="card mb-3 shadow-sm border-0 p-3 cart-item" key={c._id}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>Commande #{c._id.slice(-6)}</strong>
                <p className="text-muted small mb-0">
                  {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="text-end">
                <span className={`badge bg-${
                  c.statut === "livree" ? "success" :
                  c.statut === "annulee" ? "danger" : "warning"
                }`}>{c.statut}</span>
                <p className="fw-bold mt-1 mb-0">{c.total.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}