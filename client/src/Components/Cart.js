import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import Timer from './Timer';

const Cart = () => {
  const initialCartItems = [
    { id: 1, name: 'Match A', price: 50.00, quantity: 1, matchDate: '2024-06-15', imageUrl: 'stadium1.jpg' },
    { id: 2, name: 'Match B', price: 75.00, quantity: 1, matchDate: '2024-07-20', imageUrl: 'stadium2.jpg' },
    { id: 3, name: 'Match C', price: 100.00, quantity: 1, matchDate: '2024-08-10', imageUrl: 'stadium3.jpg' },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    document.body.classList.add('cart-page');
    return () => {
      document.body.classList.remove('cart-page');
    };
  }, []);

  return (
    <div className="container cart-page-container">
      <div className="card shadow cart-page-card">
        <div className="card-body">
          <Timer initialMinutes={10} initialSeconds={0} />
        
          <div className="cart-page-items mb-4">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onRemoveItem={handleRemoveItem} 
              />
            ))}
          </div>
          <div className="cart-page-actions d-flex justify-content-between align-items-center">
            <button className="btn btn-secondary cart-page-continue-button">Continue Shopping</button>
            <div className="cart-page-summary text-right">
              <h3 className="mb-3">Total: ${totalPrice.toFixed(2)}</h3>
              <button className="btn btn-success cart-page-checkout-button">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, onRemoveItem }) => {
  return (
    <div className="card mb-3 cart-page-item">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={item.imageUrl} className="card-img cart-page-item-image" alt={item.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title cart-page-item-name">{item.name}</h5>
              <p className="card-text cart-page-item-date">{item.matchDate}</p>
              <p className="card-text cart-page-item-price">${item.price.toFixed(2)}</p>
            </div>
            <button className="btn btn-danger cart-page-remove-button" onClick={() => onRemoveItem(item.id)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
