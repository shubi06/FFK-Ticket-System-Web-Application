import React, { useEffect, useContext } from 'react';
import { CartContext } from '../Services/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, getCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  const handleCheckout = () => {
    console.log('Vazhdo te Pagesa');
  };

  const handleRemove = (seatId) => {
    removeFromCart(seatId);
  };

  return (
    <div className="cart-wrapper">
      <h1>Shporta</h1>
      {cart && cart.cartSeats.length > 0 ? (
        <div className="cart-items">
          {cart.cartSeats.map((seat) => (
            <div key={seat.id} className="cart-item">
              <span>Ulesja: {seat.ulesjaId}</span>
              <span>Sasia: {seat.quantity}</span>
              <span>Sektori: {seat.sektoriUlseveId}</span>
              <button onClick={() => handleRemove(seat.id)}>Remove</button>
            </div>
          ))}
          <div className="continue-button-wrapper">
            <button onClick={handleCheckout} className="continue-button">Vazhdo te Pagesa</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">Shporta është bosh</div>
      )}
    </div>
  );
};

export default Cart;

