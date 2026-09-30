import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center p-16 text-xl">Chargement…</p>;
  if (!product) return <p className="text-center p-16 text-xl text-red-500">Produit introuvable</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Retour aux produits
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="rounded-lg shadow w-full" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-blue-600 font-bold text-3xl mb-6">{product.price} €</p>
          <p className="text-sm text-gray-500 mb-6">
            Stock : {product.stock > 0 ? `${product.stock} disponible(s)` : 'Rupture de stock'}
          </p>
          <button
            onClick={() => {
              dispatch(addToCart(product));
              navigate('/cart');
            }}
            disabled={product.stock === 0}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}