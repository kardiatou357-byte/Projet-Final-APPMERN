import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const [form, setForm] = useState({ nom: "", email: "", password: "" });
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", form);
      login(data);
      toast.success("Compte créé avec succès !");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur d'inscription");
    }
  };

  return (
    <div className="container my-5 fade-in" style={{ maxWidth: "450px" }}>
      <div className="card shadow border-0 p-4">
        <div className="text-center mb-3">
          <div className="logo-icon mx-auto" style={{ width: "60px", height: "60px" }}>
            <i className="bi bi-bag-heart-fill" style={{ fontSize: "2rem" }}></i>
          </div>
        </div>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-plus text-primary me-2"></i>Inscription
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input className="form-control" value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-control" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={6} required />
          </div>
          <button className="btn btn-primary w-100">S'inscrire</button>
        </form>
        <p className="text-center mt-3 mb-0 small">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}