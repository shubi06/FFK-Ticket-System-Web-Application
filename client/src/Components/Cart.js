import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Services/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import './Cart.css';

const stripePromise = loadStripe('pk_test_51PMYxGKZSCNvwzpPpalShd0ed3RuEiZqlpa51qkcNuWIqN46ngMuPKuPq3eEhJqKsHxKhmN729ZtcVlq0LWvlCj700qYIlraVI');

const Cart = () => {
  const { cart, getCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    console.log('Cart:', cart); // Log cart data before sending

    try {
      // Ensure all cartSeats have the applicationUserId field
      const cartWithUserId = {
        ...cart,
        cartSeats: cart.cartSeats.map(seat => ({
          ...seat,
          applicationUserId: cart.applicationUserId // Use the applicationUserId from the cart
        }))
      };

      const response = await fetch('http://localhost:5178/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartWithUserId),
      });

      if (response.ok) {
        const session = await response.json();
        console.log('Checkout Session:', session); // Log session data
        const result = await stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });

        if (result.error) {
          console.error('Stripe error:', result.error.message);
          navigate('/error');
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to create checkout session:', errorData); // Log error data
        navigate('/error');
      }
    } catch (error) {
      console.error('Error:', error); // Log any other errors
      navigate('/error');
    }
  };

  const handleRemove = (seatId) => {
    removeFromCart(seatId);
  };

  const totalPrice = cart ? cart.cartSeats.reduce((total, seat) => total + seat.cmimi * seat.quantity, 0) : 0;

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
              <span>Cmimi: {seat.cmimi} EUR</span>
              <button onClick={() => handleRemove(seat.id)}>Remove</button>
            </div>
          ))}
          <div className="total-price">
            <span>Total: {totalPrice.toFixed(2)} EUR</span>
          </div>
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