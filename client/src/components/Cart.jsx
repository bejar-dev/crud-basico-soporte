import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart({ visible, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className={`cart-panel ${visible ? 'show' : ''}`}>
      <div className="cart-header">
        <h3>🛒 Carrito ({cartItems.length})</h3>
        <button onClick={onClose}>Cerrar ✖️</button>
      </div>

      <div className="cart-body">
        {cartItems.length === 0 ? (
          <p>No hay incidencias en el carrito</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.title}</strong>
                <p>{item.customer_name || 'Sin cliente'}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
}
