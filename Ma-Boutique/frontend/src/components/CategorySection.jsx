import { Link } from "react-router-dom";

const categories = [
  { key: "vetements", nom: "Vêtements", icone: "bi-bag-heart", couleur: "#e91e63" },
  { key: "chaussures", nom: "Chaussures", icone: "bi-boots", couleur: "#3f51b5" },
  { key: "bijoux", nom: "Bijoux", icone: "bi-gem", couleur: "#ff9800" },
  { key: "parfums", nom: "Parfums", icone: "bi-flower1", couleur: "#9c27b0" },
  { key: "cereales", nom: "Céréales", icone: "bi-basket", couleur: "#4caf50" },
  { key: "decoration", nom: "Décoration", icone: "bi-house-heart", couleur: "#00bcd4" },
];

export default function CategorySection() {
  return (
    <section className="container my-5">
      <h2 className="section-title mb-4">
        <i className="bi bi-grid-3x3-gap text-primary me-2"></i>Nos Catégories
      </h2>
      <div className="row g-4">
        {categories.map((c) => (
          <div className="col-6 col-md-4 col-lg-2" key={c.key}>
            <Link to={`/categorie/${c.key}`} className="text-decoration-none">
              <div className="card text-center h-100 border-0 shadow-sm category-card">
                <div className="card-body">
                  <i className={`bi ${c.icone} fs-1`} style={{ color: c.couleur }}></i>
                  <h6 className="mt-3 mb-0 text-dark fw-semibold">{c.nom}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}