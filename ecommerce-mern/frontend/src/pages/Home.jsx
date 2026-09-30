import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-xl p-16">Chargement des produits…</p>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-8 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          ⚠️ Erreur de connexion au serveur
        </h2>
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-600">
          Assurez-vous que le backend est démarré :{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">npx nodemon server.js</code>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

      {products.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
          Aucun produit trouvé. Ajoutez-en via{' '}
          <a
            href="http://localhost:5000/api/products/seed/data"
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            ce lien
          </a>{' '}
          pour tester.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <Link to={`/product/${p._id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{p.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{p.category}</p>
                <p className="text-blue-600 font-bold text-xl mb-3">{p.price} €</p>
                <button
                  onClick={() => dispatch(addToCart(p))}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}