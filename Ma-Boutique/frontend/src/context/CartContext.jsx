import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (produit) => {
    setItems((prev) => {
      const exist = prev.find((i) => i._id === produit._id);
      if (exist)
        return prev.map((i) =>
          i._id === produit._id ? { ...i, quantite: i.quantite + 1 } : i
        );
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i._id !== id));
  const updateQte = (id, qte) =>
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantite: qte } : i)));
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantite, 0);
  const totalPrix = items.reduce((s, i) => s + i.prix * i.quantite, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQte, clearCart, totalItems, totalPrix }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
