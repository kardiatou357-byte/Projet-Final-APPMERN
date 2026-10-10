export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <div className="logo-icon">
                                <i className="bi bi-bag-heart-fill"></i>
                            </div>
                            <h5 className="text-white mb-0">Sopenabi-Boutique</h5>
                        </div>
                        <p className="small">Mode, beauté, senteurs et saveurs — tout en un seul endroit. Livraison rapide partout au Sénégal.</p>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-white">Liens rapides</h6>
                        <ul className="list-unstyled small">
                            <li><a href="/">Accueil</a></li>
                            <li><a href="/panier">Panier</a></li>
                            <li><a href="/login">Connexion</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-white">Contact</h6>
                        <p className="small mb-1"><i className="bi bi-geo-alt me-2"></i>Hamady Ounaré, Matam, Sénégal</p>
                        <p className="small mb-1"><i className="bi bi-telephone me-2"></i>+221 77 000 00 00</p>
                        <p className="small"><i className="bi bi-envelope me-2"></i>contact@sopenabi.sn</p>
                    </div>
                </div>
                <hr className="border-secondary" />
                <p className="text-center small mb-0">© 2026 Sopenabi-Boutique — Tous droits réservés.</p>
            </div>
        </footer>
    );
}