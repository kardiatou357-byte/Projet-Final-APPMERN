import { useEffect, useState } from "react";
import API from "../services/api";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    API.get("/produits")
      .then((res) => setProduits(res.data))
      .catch(() => setErreur("Impossible de charger les produits. Vérifiez que le backend est lancé."))
      .finally(() => setChargement(false));
  }, []);

  const filtres = produits.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const vedettes = filtres.filter((p) => p.enVedette);

  return (
    <>
      <HeroCarousel>
        <div className="mx-auto mt-4" style={{ maxWidth: "520px" }}>
          <input
            className="form-control search-bar"
            placeholder="🔍 Rechercher un produit..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
      </HeroCarousel>

      <div className="decorated-bg">
        <CategorySection />

        {vedettes.length > 0 && (
          <section className="container my-5">
            <h2 className="section-title mb-4">
              <i className="bi bi-star-fill text-warning me-2"></i>Produits en vedette
            </h2>
            <div className="row g-4">
              {vedettes.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                  <ProductCard produit={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="container my-5 pb-5">
          <h2 className="section-title mb-4">
            <i className="bi bi-grid-fill text-primary me-2"></i>Tous nos produits
          </h2>

          {erreur && <div className="alert alert-danger">{erreur}</div>}

          {chargement ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
              <p className="mt-3 text-muted">Chargement...</p>
            </div>
          ) : filtres.length === 0 ? (
            <p className="text-center text-muted py-5">Aucun produit trouvé.</p>
          ) : (
            <div className="row g-4">
              {filtres.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                  <ProductCard produit={p} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}