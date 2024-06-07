import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Services/CartContext';
import { AuthContext } from '../Services/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import './Cart.css';

const stripePromise = loadStripe('pk_test_51PMYxGKZSCNvwzpPpalShd0ed3RuEiZqlpa51qkcNuWIqN46ngMuPKuPq3eEhJqKsHxKhmN729ZtcVlq0LWvlCj700qYIlraVI');

const Cart = () => {
  const { cart, getCart, removeFromCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    console.log("Fetching cart data on component mount");
    getCart();
  }, [getCart]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
        const cartWithUserId = {
            ...cart,
            cartSeats: cart.cartSeats.map(seat => ({
                ...seat,
                applicationUserId: cart.applicationUserId,
                ndeshjaId: seat.ndeshjaId // Ensure NdeshjaId is included
            }))
        };

        console.log("Initiating checkout with data:", {
            ...cartWithUserId,
            firstName,
            lastName,
            city
        });

        const response = await fetch('http://localhost:5178/api/payment/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...cartWithUserId,
                firstName: firstName,
                lastName: lastName,
                city: city
            }),
        });

        if (response.ok) {
            const session = await response.json();
            console.log("Checkout session created:", session);

            localStorage.setItem('userId', session.userId); // Store userId in localStorage

            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (result.error) {
                console.error('Stripe error:', result.error.message);
                navigate('/error');
            }
        } else {
            const errorData = await response.json();
            console.error('Failed to create checkout session:', errorData);
            navigate('/error');
        }
    } catch (error) {
        console.error('Error:', error);
        navigate('/error');
    }
};

 

  const handleRemove = (seatId) => {
    console.log("Removing seat from cart:", seatId);
    removeFromCart(seatId);
  };

  const totalPrice = cart ? cart.cartSeats.reduce((total, seat) => total + seat.cmimi * seat.quantity, 0) : 0;

  return (
    <div className="cart-wrapper">
      <h1>Your Cart</h1>
      {cart && cart.cartSeats.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            <ul>
              {cart.cartSeats.map((seat) => (
                <li key={seat.id} className="cart-item">
                  <span>{`Seat ${seat.ulesjaId} in Sector ${seat.sektoriUlseveId}, Match ID: ${seat.ndeshjaId}`}</span>
                  <span>{seat.quantity} x {seat.cmimi} EUR</span>
                  <button onClick={() => handleRemove(seat.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="total-price">Total: {totalPrice} EUR</div>
          </div>
          <div className="order-form">
            <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
              <div>
                <label>
                  First Name:
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </label>
              </div>
              <div>
                <label>
                  Last Name:
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </label>
              </div>
              <div>
                <label>
                  City:
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </label>
              </div>
              <button type="submit" className="continue-button">Checkout</button>
            </form>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
