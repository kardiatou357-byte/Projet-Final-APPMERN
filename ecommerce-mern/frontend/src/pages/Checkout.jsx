import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

export default function Checkout() {
  const { items } = useSelector(s => s.cart);
  const { userInfo } = useSelector(s => s.auth);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  const placeOrder = async () => {
    if (!userInfo) return navigate('/login');
    try {
      await axios.post('http://localhost:5000/api/orders',
        { items, total, address },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch(clearCart());
      alert('Commande passée avec succès !');
      navigate('/');
    } catch (err) {
      alert('Erreur lors de la commande');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Finaliser la commande</h1>
      <textarea
        placeholder="Adresse de livraison"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full border p-3 rounded mb-4"
        rows="3"
      />
      <p className="text-xl font-bold mb-4">Total: {total.toFixed(2)} €</p>
      <button
        onClick={placeOrder}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        Confirmer la commande
      </button>
    </div>
  );
}