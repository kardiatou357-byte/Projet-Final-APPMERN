import { useEffect, useState } from "react";
import API from "../services/api";
import { useToast } from "../context/ToastContext";

export default function AdminPanel() {
  const [commandes, setCommandes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [onglet, setOnglet] = useState("commandes");
  const { toast } = useToast();

  useEffect(() => {
    API.get("/commandes").then((res) => setCommandes(res.data));
    API.get("/produits").then((res) => setProduits(res.data));
  }, []);

  const changerStatut = async (id, statut) => {
    const { data } = await API.put(`/commandes/${id}`, { statut });
    setCommandes((prev) => prev.map((c) => (c._id === id ? data : c)));
    toast.success("Statut mis à jour");
  };

  const supprimerProduit = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    await API.delete(`/produits/${id}`);
    setProduits((prev) => prev.filter((p) => p._id !== id));
    toast.success("Produit supprimé");
  };

  return (
    <div className="container my-5 fade-in">
      <h2 className="section-title mb-4">
        <i className="bi bi-shield-lock text-danger me-2"></i>Panneau Admin
      </h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${onglet === "commandes" ? "active" : ""}`}
            onClick={() => setOnglet("commandes")}>
            Commandes ({commandes.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${onglet === "produits" ? "active" : ""}`}
            onClick={() => setOnglet("produits")}>
            Produits ({produits.length})
          </button>
        </li>
      </ul>

      {onglet === "commandes" && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr><th>Client</th><th>Total</th><th>Statut</th></tr>
            </thead>
            <tbody>
              {commandes.map((c) => (
                <tr key={c._id}>
                  <td>{c.user?.nom}<br /><small className="text-muted">{c.user?.email}</small></td>
                  <td>{c.total.toLocaleString()} FCFA</td>
                  <td>
                    <select className="form-select form-select-sm" value={c.statut}
                      onChange={(e) => changerStatut(c._id, e.target.value)}>
                      <option value="en_attente">En attente</option>
                      <option value="confirmee">Confirmée</option>
                      <option value="expediee">Expédiée</option>
                      <option value="livree">Livrée</option>
                      <option value="annulee">Annulée</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {onglet === "produits" && (
        <div className="row g-4">
          {produits.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div className="card shadow-sm border-0 product-card">
                <img src={p.image} alt={p.nom} style={{ height: 180, objectFit: "cover" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300x200"; }} />
                <div className="card-body">
                  <h6>{p.nom}</h6>
                  <p className="fw-bold mb-2" style={{ color: "var(--primary)" }}>
                    {p.prix.toLocaleString()} FCFA
                  </p>
                  <button className="btn btn-sm btn-danger" onClick={() => supprimerProduit(p._id)}>
                    <i className="bi bi-trash"></i> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}