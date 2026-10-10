import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-4 sticky-top">
      <Link className="navbar-brand" to="/">
        <div className="logo-icon">
          <i className="bi bi-bag-heart-fill"></i>
        </div>
        <span className="logo-text">Sopenabi-Boutique</span>
      </Link>

      <div className="d-flex align-items-center gap-2 order-lg-3">
        <ThemeToggle />
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="collapse navbar-collapse order-lg-2" id="navMenu">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-house-door me-1"></i>Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/panier">
              <i className="bi bi-cart3 fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-person-circle me-1"></i>{user.nom}
                </Link>
              </li>
              {user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <i className="bi bi-shield-lock me-1"></i>Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => { logout(); navigate("/"); }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>Connexion
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-sm btn-warning" to="/register">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}