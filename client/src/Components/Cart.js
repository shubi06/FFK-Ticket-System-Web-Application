import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../Services/CartContext';
import { AuthContext } from '../Services/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { useTimer } from '../Services/TimerContext'; // Importimi i kontekstit të Timer-it
import './Cart.css';

const stripePromise = loadStripe('pk_test_51PMYxGKZSCNvwzpPpalShd0ed3RuEiZqlpa51qkcNuWIqN46ngMuPKuPq3eEhJqKsHxKhmN729ZtcVlq0LWvlCj700qYIlraVI');

const Cart = () => {
  const { cart, getCart, removeFromCart, updateSeatMetadata } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { timerStarted, timeRemaining, setTimerStarted } = useTimer(); 
  const { sectorId, ndeshjaId } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [sectorNames, setSectorNames] = useState({});

  useEffect(() => {
    console.log("Fetching cart data on component mount");
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (cart && cart.cartSeats.length > 0) {
      const fetchSectorNames = async () => {
        const sectorIds = [...new Set(cart.cartSeats.map(seat => seat.sektoriUlseveId))];
        const promises = sectorIds.map(id => 
          axios.get(`http://localhost:5178/api/SektoriUlseve/${id}`)
            .then(response => ({ id, name: response.data.emri }))
            .catch(error => {
              console.error(`There was an error fetching the sector name for sector ID: ${id}`, error);
              return { id, name: 'Unknown Sector' };
            })
        );

        const results = await Promise.all(promises);
        const sectorNamesMap = results.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});

        setSectorNames(sectorNamesMap);
      };

      fetchSectorNames();
    }
  }, [cart]);

  useEffect(() => {
    if (cart && cart.cartSeats.length === 0 && timerStarted) {
      setTimerStarted(false);
      console.log('Timer stopped as cart is empty');
    }
  }, [cart, timerStarted, setTimerStarted]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      if (!firstName || !lastName) {
        console.error('First name and last name are required.');
        return;
      }

      const cartWithUserId = {
        ...cart,
        cartSeats: cart.cartSeats.map(seat => ({
          ...seat,
          applicationUserId: cart.applicationUserId,
          ndeshjaId: seat.ndeshjaId,
          seatFirstName: seat.seatFirstName || '', // ensure not null or undefined
          seatLastName: seat.seatLastName || ''    // ensure not null or undefined
        }))
      };

      const response = await fetch('http://localhost:5178/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...cartWithUserId,
          firstName,
          lastName,
          city
        }),
      });

      if (response.ok) {
        const session = await response.json();
        localStorage.setItem('userId', session.userId);

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

  const handleSeatMetadataChange = (seatId, field, value) => {
    const updatedCart = {
      ...cart,
      cartSeats: cart.cartSeats.map(seat => {
        if (seat.id === seatId) {
          return {
            ...seat,
            [field]: value
          };
        }
        return seat;
      })
    };
    updateSeatMetadata(updatedCart);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                  <span>{`Seat ${seat.ulesjaId} in Sector ${sectorNames[seat.sektoriUlseveId] || 'Loading...'}`}</span>
                  <span>{seat.quantity} x {seat.cmimi} EUR</span>
                  <button onClick={() => handleRemove(seat.id)}>Remove</button>
                  <div className="seat-metadata">
                    <label>
                      Seat First Name:
                      <input
                        type="text"
                        value={seat.seatFirstName || ''}
                        onChange={(e) => handleSeatMetadataChange(seat.id, 'seatFirstName', e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Seat Last Name:
                      <input
                        type="text"
                        value={seat.seatLastName || ''}
                        onChange={(e) => handleSeatMetadataChange(seat.id, 'seatLastName', e.target.value)}
                        required
                      />
                    </label>
                  </div>
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
          {timerStarted && (
            <div className="timer-display">
              <p>Time remaining: {formatTime(timeRemaining)}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
