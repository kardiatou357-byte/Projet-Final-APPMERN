import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const { items } = useSelector((s) => s.cart);
  const { userInfo } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = items.reduce((a, i) => a + i.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛒 ShopMERN
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <Link to="/cart" className="relative hover:text-blue-600">
            Panier
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">👤 {userInfo.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Connexion</Link>
              <Link to="/register" className="hover:text-blue-600">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}