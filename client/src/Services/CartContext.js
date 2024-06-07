import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { token } = useContext(AuthContext);

  const getCart = useCallback(async () => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      console.log(`Fetching cart for user: ${userId}`);
      const response = await axios.get(`http://localhost:5178/api/Cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Cart data fetched:', response.data);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }, [token]);

  const addToCart = useCallback(async (seat) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      console.log('Adding to cart:', {
        ulesjaId: seat.id,
        quantity: 1,
        cmimi: seat.cmimi,
        sektoriUlseveId: seat.sectorId,
        ndeshjaId: seat.ndeshjaId,
        applicationUserId: userId // Ensure the applicationUserId is included
      });

      const response = await axios.post('http://localhost:5178/api/Cart', {
        ulesjaId: seat.id,
        quantity: 1,
        cmimi: seat.cmimi,
        sektoriUlseveId: seat.sectorId,
        ndeshjaId: seat.ndeshjaId,
        applicationUserId: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Cart data after adding seat:', response.data);
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }, [token]);

  const removeFromCart = useCallback(async (seatId) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const seatInCart = cart?.cartSeats?.find((seat) => seat.id === seatId);
      if (!seatInCart) {
        console.error('Seat ID not found in cart:', seatId);
        return;
      }

      console.log(`Removing seat ${seatId} from cart for user ${userId}`);
      const response = await axios.delete(`http://localhost:5178/api/Cart/${userId}/${seatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setCart((prevCart) => ({
          ...prevCart,
          cartSeats: prevCart.cartSeats.filter((seat) => seat.id !== seatId),
        }));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }, [token, cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};