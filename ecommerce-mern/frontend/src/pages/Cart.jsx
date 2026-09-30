import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-16 text-center">
        <p className="text-2xl mb-6">🛒 Votre panier est vide</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      {items.map((i) => (
        <div
          key={i._id}
          className="flex items-center bg-white p-4 rounded-lg shadow mb-4"
        >
          <img src={i.image} alt={i.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{i.name}</h3>
            <p className="text-gray-500">{i.price} €</p>
          </div>
          <input
            type="number"
            min="1"
            value={i.quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ id: i._id, quantity: Number(e.target.value) }))
            }
            className="w-16 border rounded px-2 py-1 text-center mr-4"
          />
          <p className="font-bold w-24 text-right">
            {(i.price * i.quantity).toFixed(2)} €
          </p>
          <button
            onClick={() => dispatch(removeFromCart(i._id))}
            className="text-red-500 hover:text-red-700 ml-4"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="text-right mt-6 bg-white p-6 rounded-lg shadow">
        <p className="text-2xl font-bold mb-4">Total : {total.toFixed(2)} €</p>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Passer commande
        </button>
      </div>
    </div>
  );
}