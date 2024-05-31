import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Note the change in the import statement
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { token } = useContext(AuthContext);

  const addToCart = async (seat) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log('User ID:', userId);
      console.log('Token:', token);

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await axios.post('http://localhost:5178/api/Cart', {
        ulesjaId: seat.id,
        quantity: 1,
        sektoriUlseveId: seat.sectorId,
        applicationUserId: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  const removeFromCart = async (seatId) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log('User ID:', userId);
      console.log('Token:', token);

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await axios.delete(`http://localhost:5178/api/Cart/${userId}/${seatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
  };

  const getCart = async () => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log('User ID:', userId);
      console.log('Token:', token);

      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await axios.get(`http://localhost:5178/api/Cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
